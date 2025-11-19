import { useMutation, useQuery } from "@tanstack/react-query";

 function useWriteContractMutation({
  mutationFn,
  addressArray,
  amountArray,
  totalAmount,
}: {
  mutationFn: ({addressArray,amountArray,totalAmount}:{addressArray?:string[],amountArray?:number[],totalAmount?:number}) => Promise<any>;
  addressArray?: string[];
  amountArray?: number[];
  totalAmount?: number;
}) {
  return useMutation({ mutationFn });
}

function useReadContractQuery({
  queryFn,
  queryKey,
}: {
  queryFn: () => Promise<any>;
  queryKey: string;
}) {
  return useQuery({ queryFn, queryKey: [queryKey] });
}

export { useReadContractQuery, useWriteContractMutation };
