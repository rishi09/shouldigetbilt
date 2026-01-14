export function Explainer() {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        How Does This Work?
      </h2>

      {/* The key rule - moved to top */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
        <h3 className="font-semibold text-lg mb-3 text-center">The New Rule</h3>
        <p className="text-gray-300 text-center mb-4">
          Bilt now uses a <span className="text-yellow-400 font-semibold">two-tier reward system</span>.
        </p>
        <p className="text-gray-400 text-center text-sm mb-4">
          To earn 1X points on your rent (fee-free), you must first spend real, non-rent money on the card.
          That spending earns <span className="text-green-400 font-semibold">4% Bilt Cash</span>, which unlocks your rent rewards.
        </p>
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <p className="text-white font-medium">
            You need <span className="text-yellow-400">$30 Bilt Cash</span> per <span className="text-white">$1,000 rent</span> to earn full points fee-free.
          </p>
        </div>
      </div>

      {/* Visual Formula */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
        <h3 className="font-semibold text-lg mb-4 text-center">The Math</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center">
          <div className="bg-zinc-800 rounded-lg px-4 py-3">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Card Spend</div>
            <div className="text-white font-semibold">$X/mo</div>
          </div>

          <span className="text-gray-500 text-xl">×</span>

          <div className="bg-zinc-800 rounded-lg px-4 py-3">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Rate</div>
            <div className="text-green-400 font-semibold">4%</div>
          </div>

          <span className="text-gray-500 text-xl">=</span>

          <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg px-4 py-3">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Bilt Cash</div>
            <div className="text-yellow-400 font-semibold">$Y/mo</div>
          </div>

          <span className="text-gray-500 text-xl">→</span>

          <div className="bg-green-900/30 border border-green-500/30 rounded-lg px-4 py-3">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Unlocks</div>
            <div className="text-green-400 font-semibold">Rent Points</div>
          </div>
        </div>
      </div>

      {/* Example table with zebra striping */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <h3 className="font-semibold text-lg mb-4 text-center">Examples</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-zinc-700">
                <th className="py-2 text-left">Your Rent</th>
                <th className="py-2 text-right">Bilt Cash Needed</th>
                <th className="py-2 text-right">Card Spending Required</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="bg-white/5">
                <td className="py-3 pl-2 rounded-l">$1,500</td>
                <td className="py-3 text-right text-yellow-400">$45</td>
                <td className="py-3 text-right text-white font-medium pr-2 rounded-r">$1,125/mo</td>
              </tr>
              <tr className="bg-transparent">
                <td className="py-3 pl-2">$2,000</td>
                <td className="py-3 text-right text-yellow-400">$60</td>
                <td className="py-3 text-right text-white font-medium pr-2">$1,500/mo</td>
              </tr>
              <tr className="bg-white/5">
                <td className="py-3 pl-2 rounded-l">$2,500</td>
                <td className="py-3 text-right text-yellow-400">$75</td>
                <td className="py-3 text-right text-white font-medium pr-2 rounded-r">$1,875/mo</td>
              </tr>
              <tr className="bg-transparent">
                <td className="py-3 pl-2">$3,000</td>
                <td className="py-3 text-right text-yellow-400">$90</td>
                <td className="py-3 text-right text-white font-medium pr-2">$2,250/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
