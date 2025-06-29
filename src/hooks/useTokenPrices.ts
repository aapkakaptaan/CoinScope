import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrices, TOKEN_ID_MAP } from "../utils/api";
import { Token } from "../types";

export const useTokenPrices = (tokens: Token[]) => {
  const tokenIds = tokens
    .map((token) => TOKEN_ID_MAP[token.symbol])
    .filter(Boolean);

  return useQuery({
    queryKey: ["tokenPrices", tokenIds],
    queryFn: () => fetchTokenPrices(tokenIds),
    enabled: tokenIds.length > 0,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });
};
