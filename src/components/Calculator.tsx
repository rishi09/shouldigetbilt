"use client";

import { useState, useMemo } from "react";
import { UserInputs } from "@/types";
import { calculateBiltValue } from "@/lib/calculations";

const DEFAULT_INPUTS: UserInputs = {
  rent: 2000,
  dining: 500,
  groceries: 400,
  travel: 200,
  other: 500,
};

const SPENDING_CATEGORIES = [
  { key: "dining" as const, label: "Dining", icon: "🍴", max: 2000 },
  { key: "groceries" as const, label: "Groceries", icon: "🛒", max: 1500 },
  { key: "travel" as const, label: "Travel", icon: "✈️", max: 1500 },
  { key: "other" as const, label: "Other", icon: "🏷️", max: 2000 },
];

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
    <section className="px-4 pb-4 lg:px-4 lg:pb-4 max-w-5xl mx-auto flex-1 flex flex-col lg:block">
      {/* MOBILE LAYOUT: Full screen design */}
      <div className="lg:hidden flex flex-col flex-1">
        {/* Rent Input - Large white box */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Rent</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 text-2xl font-bold">$</span>
            <input
              type="number"
              min="0"
              step="100"
              value={inputs.rent || ""}
              onChange={(e) => updateInput("rent")(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-white border-0 rounded-lg px-4 py-4 pl-10 text-gray-900 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Card Spending - Sliders */}
        <div className="flex-1">
          <label className="block text-gray-400 text-sm mb-3">Card spending</label>
          <div className="space-y-4">
            {SPENDING_CATEGORIES.map((category) => (
              <div key={category.key} className="flex items-center gap-3">
                <span className="text-xl w-6">{category.icon}</span>
                <span className="text-white text-sm w-20">{category.label}</span>
                <input
                  type="range"
                  min="0"
                  max={category.max}
                  step="50"
                  value={inputs[category.key]}
                  onChange={(e) => updateInput(category.key)(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <span className="text-white text-sm w-16 text-right">${inputs[category.key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results Card */}
        <div className={`rounded-xl p-4 mt-4 ${
          result.canCoverFullRent
            ? "bg-green-600"
            : "bg-yellow-600"
        }`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-white/80 text-xs uppercase tracking-wide">Estimated Annual Points:</div>
              <div className="text-white text-2xl font-bold">{result.blue.annualPoints.toLocaleString()} pts</div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-xs uppercase tracking-wide">Value:</div>
              <div className="text-white text-2xl font-bold">~${result.blue.netAnnualValue}</div>
            </div>
          </div>
          <div className="text-white text-lg font-semibold">
            Rent Coverage: {Math.round(result.coveragePercent)}%
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full py-4 rounded-xl bg-zinc-800 active:bg-zinc-700 text-white text-base font-medium mt-4"
        >
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

      {/* DESKTOP LAYOUT: Side-by-side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: Inputs */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Your Numbers</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Monthly Rent</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.rent || ""}
                  onChange={(e) => updateInput("rent")(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-8 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="border-t border-zinc-700 pt-4">
              <p className="text-gray-500 text-sm mb-3">Monthly card spending:</p>
              <div className="grid grid-cols-2 gap-3">
                {(["dining", "groceries", "travel", "other"] as const).map((key) => (
                  <div key={key}>
                    <label className="block text-gray-400 text-sm mb-1 capitalize">{key}</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={inputs[key] || ""}
                        onChange={(e) => updateInput(key)(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-2 pl-6 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Answer */}
        <div className="space-y-4">
          <div className={`rounded-xl p-8 text-center ${
            result.canCoverFullRent
              ? "bg-green-900/30 border-2 border-green-500/50"
              : "bg-yellow-900/20 border-2 border-yellow-500/50"
          }`}>
            <div className={`text-6xl font-bold mb-3 ${
              result.canCoverFullRent ? "text-green-400" : "text-yellow-400"
            }`}>
              {result.canCoverFullRent ? "YES" : "NOT YET"}
            </div>
            <p className="text-gray-300 text-lg">
              {result.canCoverFullRent ? (
                "You'll get full points on your rent, no fees."
              ) : (
                <>Need <span className="text-white font-semibold">${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()}/mo</span> more spending.</>
              )}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Need to spend</div>
                <div className="text-white font-medium text-lg">${Math.round(result.spendingNeededFor100).toLocaleString()}/mo</div>
              </div>
              <div>
                <div className="text-gray-500">You&apos;re spending</div>
                <div className={`font-medium text-lg ${result.canCoverFullRent ? "text-green-400" : "text-white"}`}>
                  ${result.totalSpending.toLocaleString()}/mo
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Coverage</span>
                <span>{Math.round(result.coveragePercent)}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${result.canCoverFullRent ? "bg-green-500" : "bg-yellow-500"}`}
                  style={{ width: `${Math.min(100, result.coveragePercent)}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="w-full py-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors text-gray-300 text-sm font-medium"
          >
            {copied ? "Link copied!" : "Share this calculator"}
          </button>
        </div>
      </div>
    </section>
  );
}
