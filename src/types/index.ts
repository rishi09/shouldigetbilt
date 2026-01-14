export interface UserInputs {
  rent: number;
  dining: number;
  groceries: number;
  travel: number;
  other: number;
}

export interface TierResult {
  monthlyPoints: number;
  annualPoints: number;
  netAnnualValue: number;
  annualFee: number;
  hotelCredit?: number;
  biltCashStipend?: number;
}

export interface CalculationResult {
  blue: TierResult;
  obsidian: TierResult;
  palladium: TierResult;
  coveragePercent: number;
  canCoverFullRent: boolean;
  biltCashEarned: number;
  biltCashNeeded: number;
  totalSpending: number;
  spendingNeededFor100: number;
}
