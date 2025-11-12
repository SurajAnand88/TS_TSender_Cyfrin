"use client";

import { useState, useMemo, useEffect } from "react";
import { AddressesInput } from "./ui/AddressesInput";
import { AmountInput } from "./ui/AmountInput";
import { TokenAddressInput } from "./ui/TokenAddressInput";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import {
  erc20ABI,
  tSenderContract,
  ERC20Contract,
  abi,
} from "../constants/constants";
import Title from "./ui/Title";
import { calculateTotalAmount } from "../constants/calculateTotalAmount/calculateTotalAmount";
import { isAddress } from "viem";
import { TDetails } from "./ui/TDetails";



export function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [addresses, setAddresses] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const totalAmount: number = useMemo(
    () => calculateTotalAmount(amount),
    [amount]
  );
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const [btn, setBtn] = useState(account.isConnected ? "Send Tokens" : "Please Connect Wallet")

  // useEffect(()=>{
  //   console.log("useEffect runs");
  // },[btn])

  function clearFormData(): void {
    setTokenAddress("");
    setAddresses("");
    setAmount("");
  }

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert("Please use the supported chain");
      return 0;
    }


    const response = await readContract(config, {
      abi: erc20ABI,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderContract as `0x${string}`],
    });


    console.log(response);

    return response as number;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission

    console.log(account)
    setBtn(account.isConnected ? "Reading Contract...." : "Please connect Account")
    const approvedAmount = await getApprovedAmount(tSenderContract);


    if (approvedAmount < totalAmount) {
      setBtn("Approve")
      const approveHash = await writeContractAsync({
        abi: erc20ABI,
        address: ERC20Contract as `0x${string}`,
        functionName: "approve",
        args: [tSenderContract as `0x${string}`, BigInt(totalAmount)],
      });


      const receipt = await waitForTransactionReceipt(config, {
        hash: approveHash,
      });

      setBtn(receipt ? "Send Transaction" : "Err: See console")

      const amountArray: number[] = amount
        .split(/[\n,]+/)
        .map((ele) => parseFloat(ele.trim()))
        .filter((num) => !isNaN(num));

      const addressArray: string[] = addresses
        .split(/[\n,]+/)
        .map((ele) => ele.trim())
        .filter((ele) => isAddress(ele));

      const sendHash = await writeContractAsync({
        abi,
        address: tSenderContract as `0x${string}`,
        functionName: "sendTokens",
        args: [ERC20Contract as `0x${string}`, addressArray, amountArray],
      });


      const sendReceipt = await waitForTransactionReceipt(config, {
        hash: sendHash,
      });

      clearFormData();

    } else {
      const amountArray: number[] = amount
        .split(/[\n,]+/)
        .map((ele) => parseFloat(ele.trim()))
        .filter((num) => !isNaN(num));

      const addressArray: string[] = addresses
        .split(/[\n,]+/)
        .map((ele) => ele.trim())
        .filter((ele) => isAddress(ele));
      console.log(addressArray, amountArray);

      const sendHash = await writeContractAsync({
        abi,
        address: tSenderContract as `0x${string}`,
        functionName: "sendTokens",
        args: [ERC20Contract as `0x${string}`, addressArray, amountArray],
      });

      console.log(sendHash);
      clearFormData();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 border-solid border-3 rounded-lg border-blue-500 px-8 py-8 mt-25"
    >
      <Title></Title>
      <TokenAddressInput value={tokenAddress} onChange={setTokenAddress} />
      <AddressesInput value={addresses} onChange={setAddresses} />
      <AmountInput value={amount} onChange={setAmount} />
      <TDetails tName="Mock20" wAmnt="10000" totalToken={1000}/>
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {btn}
      </button>
    </form>
  );
}
