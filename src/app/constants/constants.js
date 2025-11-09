export const abi = [
  {
    type: "function",
    name: "sendTokens",
    inputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "wallets", type: "address[]", internalType: "address[]" },
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

export const contractAddress = 0x7fa9385be102ac3eac297483dd6233d62b3e1496;
export const ERC20Contract = 0x34a1d3fff3958843c43ad80f30b94c510645c316;
