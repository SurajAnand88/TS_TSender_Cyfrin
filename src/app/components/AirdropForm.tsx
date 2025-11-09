"use client"

import { useState } from "react"
import { AddressesInput } from "./ui/AddressesInput"
import { AmountInput } from "./ui/AmountInput"
import { TokenAddressInput } from "./ui/TokenAddressInput"
import { useChainId, useConfig, useAccount } from 'wagmi';
import { readContract } from "@wagmi/core"
import { erc20ABI, tSenderContract, ERC20Contract, abi } from "../constants/constants"




export function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [addresses, setAddresses] = useState("")
  const [amount, setAmount] = useState("")
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();


  async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
    if (!tSenderAddress) {
      alert("Please use the supported chain");
      return 0;
    }

    const response = await readContract(config, {
      abi: erc20ABI,
      address: tokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [account.address, tSenderContract as `0x${string}`]
    })

    return response as number;


  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // handle form submission
    const inputAddreesses = addresses.split(",").map(ele => ele.trim());
    const inputAmount = amount.split(",").map(ele => ele.trim());

    console.log(account.address)
    const approvedAmount = await getApprovedAmount(tSenderContract);
    console.log(approvedAmount)
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