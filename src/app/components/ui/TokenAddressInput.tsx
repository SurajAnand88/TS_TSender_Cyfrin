"use client"

export function TokenAddressInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {

  return (
    <div className="mb-4">
      <label htmlFor="tokenAddress" className="block mb-2 font-bold text-gray-700">
        Token Address
      </label>
      <input
        id="tokenAddress"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter token contract address"
        className="w-full text-black placeholder-gray-600 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}