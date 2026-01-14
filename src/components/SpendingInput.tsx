interface SpendingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
}

export function SpendingInput({ label, value, onChange, description }: SpendingInputProps) {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-gray-300 font-medium">{label}</span>
        {description && (
          <span className="text-gray-500 text-sm ml-2">{description}</span>
        )}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
        <input
          type="number"
          min="0"
          step="50"
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="0"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-8 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          /mo
        </span>
      </div>
    </div>
  );
}
