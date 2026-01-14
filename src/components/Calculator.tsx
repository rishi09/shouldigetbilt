"use client";

import { useState, useMemo } from "react";
import { UserInputs } from "@/types";
import { calculateBiltValue, getBestTier } from "@/lib/calculations";
import { SpendingInput } from "./SpendingInput";
import { Verdict } from "./Verdict";

const DEFAULT_INPUTS: UserInputs = {
  rent: 2000,
  dining: 500,
  groceries: 400,
  travel: 200,
  other: 500,
};

export function Calculator() {
  const [inputs, setInputs] = useState<UserInputs>(DEFAULT_INPUTS);

  const result = useMemo(() => calculateBiltValue(inputs), [inputs]);
  const bestTier = useMemo(() => getBestTier(result), [result]);

  const updateInput = (key: keyof UserInputs) => (value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Your Numbers
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Enter your monthly spending to see which Bilt card (if any) makes sense.
      </p>

      {/* Input Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <SpendingInput
            label="Monthly Rent/Mortgage"
            value={inputs.rent}
            onChange={updateInput("rent")}
            description="What you pay for housing"
          />
        </div>
        <SpendingInput
          label="Dining"
          value={inputs.dining}
          onChange={updateInput("dining")}
          description="Restaurants, bars, delivery"
        />
        <SpendingInput
          label="Groceries"
          value={inputs.groceries}
          onChange={updateInput("groceries")}
          description="Supermarkets"
        />
        <SpendingInput
          label="Travel"
          value={inputs.travel}
          onChange={updateInput("travel")}
          description="Flights, hotels, Lyft"
        />
        <SpendingInput
          label="Other Spending"
          value={inputs.other}
          onChange={updateInput("other")}
          description="Everything else"
        />
      </div>

      {/* Coverage Indicator */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">Rent Points Coverage</span>
          <span className={`font-bold ${result.canCoverFullRent ? "text-green-400" : "text-yellow-400"}`}>
            {Math.round(result.coveragePercent)}%
          </span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-3 overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              result.canCoverFullRent ? "bg-green-500" : "bg-yellow-500"
            }`}
            style={{ width: `${Math.min(100, result.coveragePercent)}%` }}
          />
        </div>

        {/* Simple explanation */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-300">
            To unlock full points on your{" "}
            <span className="text-white font-medium">${inputs.rent.toLocaleString()}</span> rent,
            you need{" "}
            <span className="text-yellow-400 font-medium">${result.biltCashNeeded.toFixed(0)} in Bilt Cash</span>,
            earned by spending{" "}
            <span className="text-white font-medium">${Math.round(result.spendingNeededFor100).toLocaleString()}</span> on the card.
          </p>

          <p className={result.canCoverFullRent ? "text-green-400" : "text-gray-400"}>
            {result.canCoverFullRent ? (
              <>You&apos;re spending <span className="font-medium">${result.totalSpending.toLocaleString()}</span> — you&apos;re covered.</>
            ) : (
              <>You&apos;re spending <span className="text-white font-medium">${result.totalSpending.toLocaleString()}</span> — you need <span className="text-yellow-400 font-medium">${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()} more</span>.</>
            )}
          </p>
        </div>
      </div>

      {/* Verdict Section */}
      <Verdict result={result} inputs={inputs} bestTier={bestTier} />
    </section>
  );
}
