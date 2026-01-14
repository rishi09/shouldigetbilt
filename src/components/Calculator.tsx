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
  const [activeSlider, setActiveSlider] = useState<string | null>(null);
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
        {/* Rent Input - Fintech underline style */}
        <div className="mb-6">
          <label className="block text-gray-500 text-xs uppercase tracking-wide mb-2">Monthly Rent</label>
          <div className="flex items-baseline border-b-2 border-gray-600 pb-2 focus-within:border-green-500 transition-colors">
            <span className="text-gray-500 text-2xl mr-1">$</span>
            <input
              type="number"
              min="0"
              step="100"
              value={inputs.rent || ""}
              onChange={(e) => updateInput("rent")(Math.max(0, parseInt(e.target.value) || 0))}
              className="flex-1 bg-transparent text-white text-4xl font-bold focus:outline-none"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Card Spending - Sliders with header */}
        <div className="flex-1">
          <label className="block text-gray-500 text-xs uppercase tracking-wide mb-4">Monthly Card Spend</label>
          <div className="space-y-5">
            {SPENDING_CATEGORIES.map((category) => (
              <div key={category.key} className="flex items-center gap-3">
                <span className="text-lg w-6">{category.icon}</span>
                <span className="text-gray-300 text-sm w-20">{category.label}</span>
                <input
                  type="range"
                  min="0"
                  max={category.max}
                  step="50"
                  value={inputs[category.key]}
                  onChange={(e) => updateInput(category.key)(parseInt(e.target.value))}
                  onMouseDown={() => setActiveSlider(category.key)}
                  onMouseUp={() => setActiveSlider(null)}
                  onTouchStart={() => setActiveSlider(category.key)}
                  onTouchEnd={() => setActiveSlider(null)}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <span className={`text-sm w-16 text-right font-medium transition-colors ${
                  activeSlider === category.key ? "text-green-400 font-bold" : "text-white"
                }`}>
                  ${inputs[category.key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Results Card - Hierarchy inverted: Value first */}
        <div className={`rounded-xl p-5 mt-6 ${
          result.canCoverFullRent
            ? "bg-green-600"
            : "bg-amber-600"
        }`}>
          {/* Value is the hero stat */}
          <div className="text-center mb-3">
            <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Estimated Annual Value</div>
            <div className="text-white text-5xl font-bold">~${result.blue.netAnnualValue}</div>
            <div className="text-white/70 text-sm mt-1">{result.blue.annualPoints.toLocaleString()} pts/year</div>
          </div>

          {/* Rent Coverage with contextual color */}
          <div className={`text-center pt-3 border-t ${
            result.canCoverFullRent ? "border-white/20" : "border-white/20"
          }`}>
            <span className="text-white/70 text-sm">Rent Coverage: </span>
            <span className={`text-lg font-bold ${
              result.canCoverFullRent
                ? "text-white"
                : result.coveragePercent >= 50
                  ? "text-yellow-200"
                  : "text-red-200"
            }`}>
              {Math.round(result.coveragePercent)}%
            </span>
            {!result.canCoverFullRent && (
              <div className="text-white/60 text-xs mt-1">
                Need ${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()}/mo more
              </div>
            )}
          </div>
        </div>

        {/* Share Button - Ghost style outside card */}
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-xl border border-gray-600 bg-transparent hover:bg-zinc-800 active:bg-zinc-700 text-gray-300 text-sm font-medium mt-4 transition-colors"
        >
          {copied ? "Link Copied!" : "Share Calculator"}
        </button>
      </div>

      {/* DESKTOP LAYOUT: Side-by-side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: Inputs */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Your Numbers</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-wide mb-2">Monthly Rent</label>
              <div className="flex items-baseline border-b-2 border-gray-600 pb-2 focus-within:border-green-500 transition-colors">
                <span className="text-gray-500 text-xl mr-1">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.rent || ""}
                  onChange={(e) => updateInput("rent")(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 bg-transparent text-white text-3xl font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-zinc-700 pt-4">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">Monthly Card Spend</p>
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
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-2 pl-6 text-white text-sm focus:outline-none focus:border-green-500"
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
              : "bg-amber-900/20 border-2 border-amber-500/50"
          }`}>
            {/* Value hero */}
            <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Estimated Annual Value</div>
            <div className={`text-6xl font-bold mb-2 ${
              result.canCoverFullRent ? "text-green-400" : "text-amber-400"
            }`}>
              ~${result.blue.netAnnualValue}
            </div>
            <div className="text-gray-400 text-lg mb-4">
              {result.blue.annualPoints.toLocaleString()} pts/year
            </div>

            {/* Coverage status */}
            <div className={`text-lg ${
              result.canCoverFullRent
                ? "text-green-400"
                : result.coveragePercent >= 50
                  ? "text-amber-400"
                  : "text-red-400"
            }`}>
              {result.canCoverFullRent ? (
                "✓ Full rent points, no fees"
              ) : (
                <>Need ${Math.round(result.spendingNeededFor100 - result.totalSpending).toLocaleString()}/mo more spending</>
              )}
            </div>
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
                <span className={result.canCoverFullRent ? "text-green-400" : result.coveragePercent >= 50 ? "text-amber-400" : "text-red-400"}>
                  {Math.round(result.coveragePercent)}%
                </span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.canCoverFullRent
                      ? "bg-green-500"
                      : result.coveragePercent >= 50
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(100, result.coveragePercent)}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="w-full py-3 rounded-lg border border-zinc-600 bg-transparent hover:bg-zinc-800 transition-colors text-gray-300 text-sm font-medium"
          >
            {copied ? "Link Copied!" : "Share Calculator"}
          </button>
        </div>
      </div>
    </section>
  );
}
