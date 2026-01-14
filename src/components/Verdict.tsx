import { CalculationResult, UserInputs } from "@/types";
import { getTierVerdict } from "@/lib/calculations";
import { TierCard } from "./TierCard";

interface VerdictProps {
  result: CalculationResult;
  inputs: UserInputs;
  bestTier: "blue" | "obsidian" | "palladium";
}

export function Verdict({ result, inputs, bestTier }: VerdictProps) {
  const blueVerdict = getTierVerdict("blue", result, inputs);
  const obsidianVerdict = getTierVerdict("obsidian", result, inputs);
  const palladiumVerdict = getTierVerdict("palladium", result, inputs);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        The Verdict
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Based on your spending, here&apos;s our take on each tier.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <TierCard
          tier="blue"
          name="Blue"
          fee={0}
          result={result.blue}
          verdict={blueVerdict}
          isBest={bestTier === "blue"}
          benefits={[
            "1x points everywhere",
            "4% Bilt Cash",
            "No annual fee",
          ]}
        />
        <TierCard
          tier="obsidian"
          name="Obsidian"
          fee={95}
          result={result.obsidian}
          verdict={obsidianVerdict}
          isBest={bestTier === "obsidian"}
          benefits={[
            "3x dining OR groceries",
            "2x travel",
            "$100 hotel credit",
          ]}
        />
        <TierCard
          tier="palladium"
          name="Palladium"
          fee={495}
          result={result.palladium}
          verdict={palladiumVerdict}
          isBest={bestTier === "palladium"}
          benefits={[
            "2x everywhere",
            "$400 hotel credit",
            "$200 Bilt Cash stipend",
            "Priority Pass",
          ]}
        />
      </div>

      {/* Bottom line */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-zinc-900 rounded-lg px-6 py-4 border border-zinc-800">
          <p className="text-gray-400 text-sm mb-1">Best value for your spending:</p>
          <p className="text-xl font-bold">
            {bestTier === "blue" && <span className="text-blue-400">Bilt Blue</span>}
            {bestTier === "obsidian" && <span className="text-gray-300">Bilt Obsidian</span>}
            {bestTier === "palladium" && <span className="text-purple-400">Bilt Palladium</span>}
          </p>
          <p className="text-green-400 text-sm mt-1">
            ~${result[bestTier].netAnnualValue.toLocaleString()}/year net value
          </p>
        </div>
      </div>
    </div>
  );
}
