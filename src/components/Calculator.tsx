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
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculateBiltValue(inputs), [inputs]);

  const updateInput = (key: keyof UserInputs) => (value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
      {/* Side-by-side on desktop, reversed on mobile (answer first) */}
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Mobile: Answer first (order-1), Desktop: second (lg:order-2) */}
        <div className="space-y-4 order-1 lg:order-2">
          {/* YES/NO Card */}
          <div className={`rounded-xl p-8 text-center ${
            result.canCoverFullRent
              ? "bg-green-900/30 border-2 border-green-500/50"
              : "bg-yellow-900/20 border-2 border-yellow-500/50"
          }`}>
            <div className={`text-5xl md:text-6xl font-bold mb-3 ${
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
                You need{" "}
                <span className="text-white font-semibold">
                  ${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()}/mo more
                </span>{" "}
                spending.
              </p>
            )}
          </div>

          {/* Quick Math Summary */}
          <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">You need to spend</div>
                <div className="text-white font-medium text-lg">
                  ${Math.round(result.spendingNeededFor100).toLocaleString()}/mo
                </div>
              </div>
              <div>
                <div className="text-gray-500">You&apos;re spending</div>
                <div className={`font-medium text-lg ${result.canCoverFullRent ? "text-green-400" : "text-white"}`}>
                  ${result.totalSpending.toLocaleString()}/mo
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
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

          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-full py-3 px-4 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors text-gray-300 text-sm font-medium"
          >
            {copied ? "Link copied!" : "Share this calculator"}
          </button>
        </div>

        {/* Mobile: Inputs second (order-2), Desktop: first (lg:order-1) */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 order-2 lg:order-1">
          <h2 className="text-lg font-semibold mb-4">Your Numbers</h2>

          <div className="space-y-4">
            <SpendingInput
              label="Monthly Rent"
              value={inputs.rent}
              onChange={updateInput("rent")}
            />

            <div className="border-t border-zinc-700 pt-4">
              <p className="text-gray-500 text-sm mb-3">Monthly card spending:</p>
              <div className="grid grid-cols-2 gap-3">
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
        </div>
      </div>
    </section>
  );
}
