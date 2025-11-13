"use client"

import { setToLocalStorage } from "@/app/constants/setToLocalStorage/setToLocalStorage";

export function AmountInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="">
      <label htmlFor="amount" className="block mb-2 font-bold text-gray-700 text-sm">
        Amount of Token to Send
      </label>
      <textarea
        id="amount"
        rows={4}
        value={value}
        onChange={(e) => setToLocalStorage(e,onChange)}
        placeholder="Enter amount seprated by commas"
        className="w-full text-xs h-20 text-black placeholder-gray-600 rounded-md border border-gray-300 px-4 py-2 overflow-y-scroll resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 
             [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      />
    </div>
  )
}