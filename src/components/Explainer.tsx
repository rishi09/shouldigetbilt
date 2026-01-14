export function Explainer() {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        How Does This Work?
      </h2>
      <p className="text-gray-400 text-center mb-8">
        The short version of Bilt 2.0.
      </p>

      {/* The core mechanic */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
        <h3 className="font-semibold text-lg mb-4 text-center">The New Rule</h3>

        <div className="space-y-4 text-center">
          <p className="text-gray-300">
            To earn full points on your rent (no fees), you need to earn{" "}
            <span className="text-yellow-400 font-semibold">3% of your rent</span>{" "}
            in &quot;Bilt Cash.&quot;
          </p>

          <p className="text-gray-300">
            You earn Bilt Cash at{" "}
            <span className="text-green-400 font-semibold">4%</span>{" "}
            of everything you spend on the card.
          </p>

          <div className="border-t border-zinc-700 pt-4 mt-4">
            <p className="text-white text-lg font-medium">
              3% ÷ 4% = <span className="text-blue-400">75%</span>
            </p>
            <p className="text-gray-400 mt-2">
              Spend <span className="text-white">75% of your rent</span> on the card → full rent points, no fees.
            </p>
          </div>
        </div>
      </div>

      {/* Example table */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
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
              <tr className="border-b border-zinc-800">
                <td className="py-3">$1,500</td>
                <td className="py-3 text-right text-yellow-400">$45</td>
                <td className="py-3 text-right text-white font-medium">$1,125/mo</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-3">$2,000</td>
                <td className="py-3 text-right text-yellow-400">$60</td>
                <td className="py-3 text-right text-white font-medium">$1,500/mo</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-3">$2,500</td>
                <td className="py-3 text-right text-yellow-400">$75</td>
                <td className="py-3 text-right text-white font-medium">$1,875/mo</td>
              </tr>
              <tr>
                <td className="py-3">$3,000</td>
                <td className="py-3 text-right text-yellow-400">$90</td>
                <td className="py-3 text-right text-white font-medium">$2,250/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* What if you don't hit it */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-orange-900/50">
        <div className="flex items-start gap-3">
          <span className="text-orange-500 text-xl">⚠</span>
          <div>
            <h3 className="font-semibold text-lg mb-2">What if you don&apos;t spend enough?</h3>
            <p className="text-gray-400">
              You can still earn rent points, but you&apos;ll pay a{" "}
              <span className="text-orange-400 font-medium">3% transaction fee</span>{" "}
              — which basically wipes out the value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
