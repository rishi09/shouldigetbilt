import { TierResult } from "@/types";

interface TierCardProps {
  tier: "blue" | "obsidian" | "palladium";
  name: string;
  fee: number;
  result: TierResult;
  verdict: { recommend: boolean; reasons: string[] };
  isBest: boolean;
  benefits: string[];
}

export function TierCard({ tier, name, fee, result, verdict, isBest, benefits }: TierCardProps) {
  const tierColors = {
    blue: {
      border: isBest ? "border-blue-500" : "border-zinc-800",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      badge: "bg-blue-500",
    },
    obsidian: {
      border: isBest ? "border-gray-400" : "border-zinc-800",
      bg: "bg-gray-500/10",
      text: "text-gray-300",
      badge: "bg-gray-500",
    },
    palladium: {
      border: isBest ? "border-purple-500" : "border-zinc-800",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      badge: "bg-purple-500",
    },
  };

  const colors = tierColors[tier];

  return (
    <div className={`bg-zinc-900 rounded-lg border ${colors.border} overflow-hidden relative ${isBest ? "ring-2 ring-offset-2 ring-offset-zinc-950" : ""}`}>
      {isBest && (
        <div className={`${colors.badge} text-white text-xs font-bold px-3 py-1 text-center`}>
          BEST VALUE
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className={`text-xl font-bold ${colors.text}`}>{name}</h3>
          <p className="text-gray-500 text-sm">
            {fee === 0 ? "No annual fee" : `$${fee}/year`}
          </p>
        </div>

        {/* Verdict */}
        <div className={`text-center py-3 rounded-lg mb-4 ${verdict.recommend ? "bg-green-900/30" : "bg-zinc-800"}`}>
          <span className={`font-bold text-lg ${verdict.recommend ? "text-green-400" : "text-gray-400"}`}>
            {verdict.recommend ? "YES" : "MAYBE"}
          </span>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Monthly points</span>
            <span className="text-white">{result.monthlyPoints.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Annual points</span>
            <span className="text-white">{result.annualPoints.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-800 pt-2">
            <span className="text-gray-500">Net value/year</span>
            <span className={result.netAnnualValue > 0 ? "text-green-400 font-medium" : "text-gray-400"}>
              ${result.netAnnualValue.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-1 mb-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="border-t border-zinc-800 pt-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Why:</p>
          <ul className="space-y-1">
            {verdict.reasons.slice(0, 2).map((reason, i) => (
              <li key={i} className="text-sm text-gray-400">
                • {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
