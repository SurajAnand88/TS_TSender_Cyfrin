"use client"

export function AddressesInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-4">
      <label htmlFor="addresses" className="block mb-2 font-bold text-gray-700">
        Wallet Addresses (comma separated)
      </label>
      <textarea
        id="addresses"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter multiple wallet addresses separated by commas"
        rows={4}
        className="w-full text-black placeholder-gray-600 rounded-md border border-gray-300 px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}