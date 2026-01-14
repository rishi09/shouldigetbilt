import { Hero } from "@/components/Hero";
import { Explainer } from "@/components/Explainer";
import { Calculator } from "@/components/Calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />

      <div className="border-t border-zinc-800" />

      <Explainer />

      <div className="border-t border-zinc-800" />

      <Calculator />

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-zinc-800">
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          This calculator uses a conservative 1.5 cents per point valuation.
          Actual value depends on how you redeem (transfer partners can get 2+ cpp).
          Not financial advice. Do your own research.
        </p>
        <p className="text-gray-600 text-xs mt-4">
          Built by someone equally frustrated by Bilt 2.0
        </p>
      </footer>
    </main>
  );
}
