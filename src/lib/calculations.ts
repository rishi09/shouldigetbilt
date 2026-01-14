import { UserInputs, TierResult, CalculationResult } from "@/types";

const POINT_VALUE_CPP = 0.015; // Conservative 1.5 cents per point valuation

/**
 * Calculate Bilt value for all tiers based on user spending inputs.
 *
 * Key Bilt 2.0 mechanics:
 * - All card spending earns 4% Bilt Cash
 * - $30 Bilt Cash unlocks 1 point per $1 on $1,000 of rent/mortgage
 * - Need to spend ~75% of rent to cover full rent rewards fee-free
 * - Without enough Bilt Cash, you pay 3% fee to earn rent points
 */
export function calculateBiltValue(inputs: UserInputs): CalculationResult {
  const { rent, dining, groceries, travel, other } = inputs;

  // Total monthly card spending (excluding rent)
  const totalSpending = dining + groceries + travel + other;

  // Bilt Cash earned (4% of all spending)
  const biltCashEarned = totalSpending * 0.04;

  // Bilt Cash needed for full rent rewards ($30 per $1000 rent)
  const biltCashNeeded = (rent / 1000) * 30;

  // Coverage calculation
  const coveragePercent = biltCashNeeded > 0
    ? Math.min(100, (biltCashEarned / biltCashNeeded) * 100)
    : 100;
  const canCoverFullRent = biltCashEarned >= biltCashNeeded;

  // How much spending needed for 100% coverage
  const spendingNeededFor100 = biltCashNeeded / 0.04;

  // Rent points earned (partial if not enough Bilt Cash)
  const rentPointsEarned = canCoverFullRent
    ? rent
    : (biltCashEarned / 30) * 1000;

  return {
    blue: calculateBlueValue(inputs, rentPointsEarned),
    obsidian: calculateObsidianValue(inputs, rentPointsEarned),
    palladium: calculatePalladiumValue(inputs, rentPointsEarned),
    coveragePercent,
    canCoverFullRent,
    biltCashEarned,
    biltCashNeeded,
    totalSpending,
    spendingNeededFor100,
  };
}

function calculateBlueValue(inputs: UserInputs, rentPoints: number): TierResult {
  // Blue: 1x on everything, 4% Bilt Cash, $0 annual fee
  const spendingPoints = inputs.dining + inputs.groceries + inputs.travel + inputs.other;
  const totalMonthlyPoints = spendingPoints + rentPoints;
  const annualPoints = totalMonthlyPoints * 12;

  return {
    monthlyPoints: Math.round(totalMonthlyPoints),
    annualPoints: Math.round(annualPoints),
    netAnnualValue: Math.round(annualPoints * POINT_VALUE_CPP),
    annualFee: 0,
  };
}

function calculateObsidianValue(inputs: UserInputs, rentPoints: number): TierResult {
  // Obsidian: 3x dining OR groceries (capped $25k/yr), 2x travel, 1x other
  // $95 annual fee, $100 hotel credit
  const higherDiningGrocery = Math.max(inputs.dining, inputs.groceries);
  const lowerDiningGrocery = Math.min(inputs.dining, inputs.groceries);

  // Cap the 3x category at $25k/yr = ~$2083/month
  const bonusCategorySpend = Math.min(higherDiningGrocery, 2083);
  const bonusCategoryPoints = bonusCategorySpend * 3;

  // Remaining dining/grocery at 1x
  const otherDiningGroceryPoints = (higherDiningGrocery - bonusCategorySpend + lowerDiningGrocery) * 1;

  const travelPoints = inputs.travel * 2;
  const otherPoints = inputs.other * 1;

  const totalMonthlyPoints = bonusCategoryPoints + otherDiningGroceryPoints + travelPoints + otherPoints + rentPoints;
  const annualPoints = totalMonthlyPoints * 12;
  const hotelCredit = 100;
  const annualFee = 95;

  return {
    monthlyPoints: Math.round(totalMonthlyPoints),
    annualPoints: Math.round(annualPoints),
    netAnnualValue: Math.round((annualPoints * POINT_VALUE_CPP) + hotelCredit - annualFee),
    annualFee,
    hotelCredit,
  };
}

function calculatePalladiumValue(inputs: UserInputs, rentPoints: number): TierResult {
  // Palladium: 2x on everything, $495 fee, $400 hotel credit, $200 Bilt Cash stipend
  // The $200 Bilt Cash stipend also helps cover rent (adds $200 / 0.03 = ~$6,667 more rent coverage)
  const spendingPoints = (inputs.dining + inputs.groceries + inputs.travel + inputs.other) * 2;
  const totalMonthlyPoints = spendingPoints + rentPoints;
  const annualPoints = totalMonthlyPoints * 12;
  const hotelCredit = 400;
  const biltCashStipend = 200;
  const annualFee = 495;

  return {
    monthlyPoints: Math.round(totalMonthlyPoints),
    annualPoints: Math.round(annualPoints),
    netAnnualValue: Math.round((annualPoints * POINT_VALUE_CPP) + hotelCredit + biltCashStipend - annualFee),
    annualFee,
    hotelCredit,
    biltCashStipend,
  };
}

/**
 * Determine the best tier based on net annual value
 */
export function getBestTier(result: CalculationResult): "blue" | "obsidian" | "palladium" {
  const values = [
    { tier: "blue" as const, value: result.blue.netAnnualValue },
    { tier: "obsidian" as const, value: result.obsidian.netAnnualValue },
    { tier: "palladium" as const, value: result.palladium.netAnnualValue },
  ];

  return values.reduce((best, current) =>
    current.value > best.value ? current : best
  ).tier;
}

/**
 * Get verdict for each tier
 */
export function getTierVerdict(
  tier: "blue" | "obsidian" | "palladium",
  result: CalculationResult,
  inputs: UserInputs
): { recommend: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let recommend = false;

  switch (tier) {
    case "blue":
      if (result.canCoverFullRent) {
        recommend = true;
        reasons.push("Your spending covers full rent rewards");
      } else if (result.coveragePercent >= 50) {
        recommend = true;
        reasons.push(`You're at ${Math.round(result.coveragePercent)}% rent coverage`);
      } else {
        reasons.push("You'd need to spend more to unlock rent rewards");
      }

      if (inputs.dining + inputs.groceries > 1000) {
        reasons.push("Consider Obsidian for 3x dining/groceries");
      }
      break;

    case "obsidian":
      const higherCategory = Math.max(inputs.dining, inputs.groceries);
      if (higherCategory >= 500) {
        recommend = true;
        reasons.push(`3x on $${higherCategory}/mo dining/groceries is solid`);
      }

      if (result.obsidian.netAnnualValue > result.blue.netAnnualValue) {
        recommend = true;
        reasons.push("$100 hotel credit helps justify $95 fee");
      } else {
        reasons.push("Blue might be better for your spending pattern");
      }
      break;

    case "palladium":
      if (result.totalSpending >= 3000) {
        recommend = true;
        reasons.push("High spender: 2x everywhere adds up");
      }

      if (result.palladium.netAnnualValue > result.obsidian.netAnnualValue) {
        recommend = true;
        reasons.push("Credits + 2x multiplier exceed $495 fee");
      } else {
        reasons.push("Hard to justify $495 with your spending");
      }

      if (result.palladium.biltCashStipend) {
        reasons.push("$200 Bilt Cash stipend helps cover rent");
      }
      break;
  }

  return { recommend, reasons: [...new Set(reasons)] };
}
