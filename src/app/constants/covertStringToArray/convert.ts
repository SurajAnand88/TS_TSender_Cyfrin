import { isAddress } from "viem";

function convertStringToNumbersArray(amount: string): number[] {
  return amount
    .split(/[\n,]+/)
    .map((ele) => parseFloat(ele.trim()))
    .filter((num) => !isNaN(num));
}

function convertStringToAddressArray(addresses: string): string[] {
  return addresses
    .split(/[\n,]+/)
    .map((ele) => ele.trim())
    .filter((ele) => isAddress(ele));
}

export { convertStringToAddressArray, convertStringToNumbersArray };
