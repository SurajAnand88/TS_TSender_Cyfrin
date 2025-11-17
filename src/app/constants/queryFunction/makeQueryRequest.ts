import { useQuery } from "@tanstack/react-query";

export function makeQueryRequest({
  queryFn,
  queryKey,
  enabled = true,
}: {
  queryFn: () => Promise<any>;
  queryKey: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    enabled: enabled,
  });
}
