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

        <div className="space-y-3 text-center">
          <p className="text-gray-300">
            To earn full points on your rent (no fees), you need{" "}
            <span className="text-yellow-400 font-semibold">&quot;Bilt Cash.&quot;</span>
          </p>

          <p className="text-gray-300">
            You earn Bilt Cash at{" "}
            <span className="text-green-400 font-semibold">4%</span>{" "}
            of everything you spend on the card.
          </p>

          <p className="text-gray-400 text-sm">
            Here&apos;s how much you need to spend:
          </p>
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
    </section>
  );
}
