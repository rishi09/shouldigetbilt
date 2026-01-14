export function Explainer() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        What Changed with Bilt 2.0?
      </h2>

      <div className="space-y-6">
        {/* Point 1 */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-start gap-4">
            <span className="text-red-500 text-2xl">✕</span>
            <div>
              <h3 className="font-semibold text-lg mb-2">The old deal is dead</h3>
              <p className="text-gray-400">
                Before: Make 5 transactions per month → earn points on rent, no fees.
                <br />
                <span className="text-red-400">That&apos;s gone.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Point 2 */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-start gap-4">
            <span className="text-yellow-500 text-2xl">$</span>
            <div>
              <h3 className="font-semibold text-lg mb-2">The new math: Bilt Cash</h3>
              <p className="text-gray-400">
                Now you earn <span className="text-white font-medium">&quot;Bilt Cash&quot;</span> (4% of all card spending).
                <br />
                That Bilt Cash &quot;unlocks&quot; rent rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Point 3 */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-start gap-4">
            <span className="text-blue-500 text-2xl font-bold">75%</span>
            <div>
              <h3 className="font-semibold text-lg mb-2">The 75% rule</h3>
              <p className="text-gray-400">
                To earn full rent points fee-free, you need to spend{" "}
                <span className="text-white font-medium">~75% of your rent</span> on the card.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Example: $2,000 rent → need $1,500/month card spending
              </p>
            </div>
          </div>
        </div>

        {/* Point 4 */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-start gap-4">
            <span className="text-orange-500 text-2xl">⚠</span>
            <div>
              <h3 className="font-semibold text-lg mb-2">The 3% fee trap</h3>
              <p className="text-gray-400">
                Don&apos;t spend enough? You can still earn rent points...{" "}
                <span className="text-orange-400">but you&apos;ll pay a 3% fee</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Point 5 */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-start gap-4">
            <span className="text-purple-500 text-2xl">◆</span>
            <div>
              <h3 className="font-semibold text-lg mb-2">Three card tiers</h3>
              <div className="grid grid-cols-3 gap-4 mt-3 text-center text-sm">
                <div className="bg-zinc-800 rounded p-3">
                  <div className="font-medium text-blue-400">Blue</div>
                  <div className="text-gray-500">$0/yr</div>
                </div>
                <div className="bg-zinc-800 rounded p-3">
                  <div className="font-medium text-gray-300">Obsidian</div>
                  <div className="text-gray-500">$95/yr</div>
                </div>
                <div className="bg-zinc-800 rounded p-3">
                  <div className="font-medium text-purple-400">Palladium</div>
                  <div className="text-gray-500">$495/yr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual diagram */}
      <div className="mt-10 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <h3 className="font-semibold text-center mb-4">How it works now:</h3>
        <div className="flex items-center justify-center gap-2 md:gap-4 text-sm md:text-base flex-wrap">
          <div className="bg-green-900/50 text-green-400 px-3 py-2 rounded">
            Card Spending
          </div>
          <span className="text-gray-500">→</span>
          <div className="bg-yellow-900/50 text-yellow-400 px-3 py-2 rounded">
            4% Bilt Cash
          </div>
          <span className="text-gray-500">→</span>
          <div className="bg-blue-900/50 text-blue-400 px-3 py-2 rounded">
            Unlocks Rent Points
          </div>
        </div>
      </div>
    </section>
  );
}
