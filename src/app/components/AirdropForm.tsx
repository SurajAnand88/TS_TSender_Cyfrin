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
import { formatEther } from "viem";
import { useQuery } from "@tanstack/react-query";
import { convertStringToAddressArray, convertStringToNumbersArray } from "../constants/covertStringToArray/convert";
import { useReadContractQuery, useWriteContractMutation } from "../constants/queryFunction/queryRequest";
import { Spinner } from "./ui/Spinner";





export function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState(localStorage.getItem("tokenAddress") || "");
  const [addresses, setAddresses] = useState(localStorage.getItem("addresses") || "");
  const [amount, setAmount] = useState(localStorage.getItem("amount") || "");
  const [addressArray, setAddressArray] = useState<string[]>([]);
  const [amountArray, setAmountArray] = useState<number[]>([]);
  const [btn, setBtn] = useState("Send Tokens")
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalInWei, setTotalInWei] = useState(0)
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const totalAmount: number = useMemo(
    () => calculateTotalAmount(amount),
    [amount]
  );

  const clearFormData = (): void => {
    setBtn("Send Tokens")
    setTokenAddress("");
    setAddresses("")
    setAmount("")
  }

  const getSymbol = async () => {
    return await readContract(config, {
      abi: erc20ABI,
      address: tokenAddress as `0x${string}`,
      functionName: "symbol"
    })
  }

  const approveAmountWrite = async ({ totalAmount }: { totalAmount?: number }) => {
    console.log(totalAmount)
    return await writeContractAsync({
      abi: erc20ABI,
      address: ERC20Contract as `0x${string}`,
      functionName: "approve",
      args: [tSenderContract as `0x${string}`, BigInt(totalAmount ? totalAmount : 0)],
    });
  }

  const sendTokens = async ({ addressArray, amountArray }: { addressArray?: string[], amountArray?: number[] }) => {
    return await writeContractAsync({
      abi,
      address: tSenderContract as `0x${string}`,
      functionName: "sendTokens",
      args: [ERC20Contract as `0x${string}`, addressArray, amountArray],
    });
  }

  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { data: symbol, isLoading, isError } = useReadContractQuery({ queryFn: getSymbol, queryKey: tokenAddress });
  const approveTransaction = useWriteContractMutation({ mutationFn: approveAmountWrite, totalAmount: totalAmount })
  const sendTransaction = useWriteContractMutation({ mutationFn: sendTokens, addressArray: addressArray, amountArray: amountArray })
  const { data: sendHash, isError: isErrorSendTokens, isPending: isPendingSendTokens } = sendTransaction;
  const { data: approveHash, isPending: isPendingApprove, isError: isErrorApprove } = approveTransaction;

  useEffect(() => {
    const total: number = calculateTotalAmount(amount);
    setTotalInWei(total);
  }, [amount])


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
    return response as number;

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission
    const approvedAmount = await getApprovedAmount(tSenderContract);
    console.log("approve amount ", approvedAmount,)

    if (approvedAmount < totalAmount) {
      setBtn("Approve")
      setAmountArray([...convertStringToNumbersArray(amount)])
      setAddressArray([...convertStringToAddressArray(addresses)])
      approveTransaction.mutate({ totalAmount }, {
        onSuccess: async (approveHash) => {
          console.log("Approval Success", approveHash);

          const hashA = await waitForTransactionReceipt(config, {
            hash: approveHash
          })
          if (hashA) setBtn("Tokens Approved");

          sendTransaction.mutate({ addressArray, amountArray }, {
            onSuccess: async (sendHash) => {
              const hashS = await waitForTransactionReceipt(config, {
                hash: sendHash
              })

              if (hashS) setBtn("Tokens Sent")
              console.log("Transaction Successful.....", sendHash)
              setTimeout(() => { clearFormData() }, 5000)

            },

            onError: (error) => {
              console.log("Transaction Error", error)
              setTimeout(() => { clearFormData() }, 5000)
            }
          })
        },
        onError: (error) => {
          console.log("Approval Error", error);
        }
      })



    } else {
      setAmountArray([...convertStringToNumbersArray(amount)])
      setAddressArray([...convertStringToAddressArray(addresses)])

      sendTransaction.mutate({ addressArray, amountArray }, {
        onSuccess: async (sendHash) => {
          const hashS = await waitForTransactionReceipt(config, {
            hash: sendHash
          })

          if (hashS) setBtn("Tokens Sent")
          console.log("Transaction Successful.....", sendHash)
          setTimeout(() => { clearFormData() }, 5000)
        },
        onError: (error) => {
          console.log("Transaction Error", error)
          setBtn("Transaction Dropped See Console")
        }
      })
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border-solid border-3 rounded-lg border-blue-500 px-8 py-8 mt-23"
    >
      <Title></Title>
      <TokenAddressInput value={tokenAddress} onChange={setTokenAddress} />
      <AddressesInput value={addresses} onChange={setAddresses} />
      <AmountInput value={amount} onChange={setAmount} />
      {tokenAddress && addresses && amount ? <TDetails tName={isLoading ? "Loading...." : isError ? "Invalid Address" : symbol as string} wAmnt={totalInWei} totalToken={formatEther(BigInt(totalInWei))} /> : null}
      <button
        type="submit"
        className={`mt-4 w-full rounded-md ${isPendingApprove ? 'bg-orange-400' : isPendingSendTokens ? 'bg-green-600' : isErrorApprove || isErrorSendTokens ? 'bg-red-500' : 'bg-blue-500'} px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {isPendingApprove || isPendingSendTokens?<Spinner/>:null}
        {account.isConnecting ? "Connecting..." : !account.isConnected ? "Please Connect Your Account" : isPendingApprove ? "Approving..." : isPendingSendTokens ? "Sending Tokens..." : isErrorApprove || isErrorSendTokens ? "Err : See Console" : btn}
      </button>
    </form>
  );
}



