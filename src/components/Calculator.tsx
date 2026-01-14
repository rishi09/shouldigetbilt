"use client";

import { useState, useMemo } from "react";
import { UserInputs } from "@/types";
import { calculateBiltValue } from "@/lib/calculations";
import { SpendingInput } from "./SpendingInput";

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

  const updateInput = (key: keyof UserInputs) => (value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Will You Get Full Rent Points?
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Enter your numbers. We&apos;ll tell you if Bilt works for you.
      </p>

      {/* Input Grid */}
      <div className="space-y-4 mb-8">
        <SpendingInput
          label="Monthly Rent"
          value={inputs.rent}
          onChange={updateInput("rent")}
        />

        <div className="border-t border-zinc-800 pt-4">
          <p className="text-gray-500 text-sm mb-4">Your monthly card spending:</p>
          <div className="grid grid-cols-2 gap-4">
            <SpendingInput
              label="Dining"
              value={inputs.dining}
              onChange={updateInput("dining")}
            />
            <SpendingInput
              label="Groceries"
              value={inputs.groceries}
              onChange={updateInput("groceries")}
            />
            <SpendingInput
              label="Travel"
              value={inputs.travel}
              onChange={updateInput("travel")}
            />
            <SpendingInput
              label="Other"
              value={inputs.other}
              onChange={updateInput("other")}
            />
          </div>
        </div>
      </div>

      {/* THE ANSWER */}
      <div className={`rounded-xl p-8 text-center mb-6 ${
        result.canCoverFullRent
          ? "bg-green-900/30 border-2 border-green-500/50"
          : "bg-yellow-900/20 border-2 border-yellow-500/50"
      }`}>
        <div className={`text-5xl font-bold mb-3 ${
          result.canCoverFullRent ? "text-green-400" : "text-yellow-400"
        }`}>
          {result.canCoverFullRent ? "YES" : "NOT YET"}
        </div>

        {result.canCoverFullRent ? (
          <p className="text-gray-300 text-lg">
            You&apos;ll get full points on your rent, no fees.
          </p>
        ) : (
          <p className="text-gray-300 text-lg">
            You need to spend{" "}
            <span className="text-white font-semibold">
              ${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()}/mo more
            </span>{" "}
            on the card.
          </p>
        )}
      </div>

      {/* The math breakdown */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <h3 className="font-medium text-gray-400 mb-4 text-center">The Math</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Your rent</span>
            <span className="text-white font-medium">${inputs.rent.toLocaleString()}/mo</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Bilt Cash needed (3% of rent)</span>
            <span className="text-yellow-400 font-medium">${result.biltCashNeeded.toFixed(0)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Card spending required</span>
            <span className="text-white font-medium">${Math.round(result.spendingNeededFor100).toLocaleString()}/mo</span>
          </div>

          <div className="border-t border-zinc-700 pt-3 flex justify-between">
            <span className="text-gray-400">Your card spending</span>
            <span className={`font-medium ${result.canCoverFullRent ? "text-green-400" : "text-white"}`}>
              ${result.totalSpending.toLocaleString()}/mo
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Bilt Cash you&apos;ll earn (4%)</span>
            <span className={`font-medium ${result.canCoverFullRent ? "text-green-400" : "text-yellow-400"}`}>
              ${result.biltCashEarned.toFixed(0)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Coverage</span>
            <span>{Math.round(result.coveragePercent)}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                result.canCoverFullRent ? "bg-green-500" : "bg-yellow-500"
              }`}
              style={{ width: `${Math.min(100, result.coveragePercent)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
