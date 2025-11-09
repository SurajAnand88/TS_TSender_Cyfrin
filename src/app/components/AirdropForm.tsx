"use client"

import { useState } from "react"
import {AddressesInput} from "./ui/AddressesInput"
import {AmountInput} from "./ui/AmountInput"
import {TokenAddressInput} from "./ui/TokenAddressInput"


export function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [addresses, setAddresses] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle form submission
    const inputAddreesses = addresses.split(",").map(ele=>ele.trim());
    const inputAmount = amount.split(",").map(ele=>ele.trim());

    console.log(inputAddreesses);
    console.log(inputAmount);
    
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border-solid border-4 rounded-lg border-blue-500 px-8 py-8 my-10">
      <TokenAddressInput value={tokenAddress} onChange={setTokenAddress} />
      <AddressesInput value={addresses} onChange={setAddresses} />
      <AmountInput value={amount} onChange={setAmount} />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send Tokens
      </button>
    </form>
  )
}