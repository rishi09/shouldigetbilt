import { Hero } from "@/components/Hero";
import { Explainer } from "@/components/Explainer";
import { Calculator } from "@/components/Calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />

      <Calculator />

      <div className="border-t border-zinc-800 mt-8" />

      <Explainer />

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-zinc-800">
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Not financial advice. Just math.
        </p>
        <p className="text-gray-600 text-xs mt-4">
          Built by someone equally frustrated by Bilt 2.0
        </p>
      </footer>
    </main>
  );
}
