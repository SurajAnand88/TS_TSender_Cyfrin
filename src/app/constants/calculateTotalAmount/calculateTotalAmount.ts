export function calculateTotalAmount(amounts: string): number {
  const amountArray: number[] = amounts
    .split(/[\n,]+/)
    .map((ele) => parseFloat(ele.trim()))
    .filter((num) => !isNaN(num));

  if (amountArray.length == 0) {
    return 0;
  } else {
    return amountArray.reduce((total, sum) => total + sum, 0);
  }
}
