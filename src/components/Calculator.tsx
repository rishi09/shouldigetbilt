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
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Rent Coverage</span>
          <span className={`font-bold ${result.canCoverFullRent ? "text-green-400" : "text-yellow-400"}`}>
            {Math.round(result.coveragePercent)}%
          </span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              result.canCoverFullRent ? "bg-green-500" : "bg-yellow-500"
            }`}
            style={{ width: `${Math.min(100, result.coveragePercent)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {result.canCoverFullRent ? (
            <span className="text-green-400">
              You&apos;re earning full rent points fee-free.
            </span>
          ) : (
            <>
              Spend{" "}
              <span className="text-white">
                ${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()}
              </span>{" "}
              more per month for full coverage.
            </>
          )}
        </p>

        {/* Bilt Cash breakdown */}
        <div className="mt-4 pt-4 border-t border-zinc-700 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Bilt Cash Earned</div>
            <div className="text-yellow-400 font-medium">
              ${result.biltCashEarned.toFixed(2)}/mo
            </div>
          </div>
          <div>
            <div className="text-gray-500">Bilt Cash Needed</div>
            <div className="text-white font-medium">
              ${result.biltCashNeeded.toFixed(2)}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Section */}
      <Verdict result={result} inputs={inputs} bestTier={bestTier} />
    </section>
  );
}
