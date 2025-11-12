"use client"

export function AddressesInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="">
      <label htmlFor="addresses" className="block mb-2 font-bold text-gray-700 text-sm">
        Wallet Addresses (comma separated)
      </label>
      <textarea
        id="addresses"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter multiple wallet addresses separated by commas"
        rows={2}
        className="w-full text-xs h-20 text-black placeholder-gray-600 rounded-md border border-gray-300 px-4 py-2 overflow-y-scroll resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 
             [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      />
    </div>
  )
}