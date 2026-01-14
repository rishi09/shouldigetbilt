export function Explainer() {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        How Does This Work?
      </h2>
      <p className="text-gray-500 text-center mb-8">
        The short version of Bilt 2.0
      </p>

      {/* Visual Formula */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
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

        <p className="text-gray-500 text-sm text-center mt-4">
          You need $30 Bilt Cash per $1,000 rent to earn full points fee-free.
        </p>
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
              <tr className="bg-zinc-800/50">
                <td className="py-3 rounded-l">$1,500</td>
                <td className="py-3 text-right text-yellow-400">$45</td>
                <td className="py-3 text-right text-white font-medium rounded-r">$1,125/mo</td>
              </tr>
              <tr className="bg-transparent">
                <td className="py-3">$2,000</td>
                <td className="py-3 text-right text-yellow-400">$60</td>
                <td className="py-3 text-right text-white font-medium">$1,500/mo</td>
              </tr>
              <tr className="bg-zinc-800/50">
                <td className="py-3 rounded-l">$2,500</td>
                <td className="py-3 text-right text-yellow-400">$75</td>
                <td className="py-3 text-right text-white font-medium rounded-r">$1,875/mo</td>
              </tr>
              <tr className="bg-transparent">
                <td className="py-3">$3,000</td>
                <td className="py-3 text-right text-yellow-400">$90</td>
                <td className="py-3 text-right text-white font-medium">$2,250/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
