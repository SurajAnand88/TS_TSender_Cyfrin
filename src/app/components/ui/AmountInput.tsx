"use client"


export function AmountInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-4">
      <label htmlFor="amount" className="block mb-2 font-bold text-gray-700">
        Amount of Token to Send
      </label>
      <textarea
        id="amount"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter amount seprated by commas"
        className="w-full text-black placeholder-gray-600 rounded-md border border-gray-300 px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}