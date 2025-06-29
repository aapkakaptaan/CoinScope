import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Token } from "../types";
import { COMMON_TOKENS, ERC20_ABI } from "../utils/tokenContracts";

export const useTokenBalances = (
  address: string | null,
  chainId: number | null
) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customTokens, setCustomTokens] = useState<Token[]>([]);

  const fetchTokenBalances = async () => {
    if (!address || !chainId || typeof window.ethereum === "undefined") return;

    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const commonTokens = COMMON_TOKENS[chainId] || [];
      const allTokens = [...commonTokens, ...customTokens];

      const tokenPromises = allTokens.map(async (tokenInfo) => {
        try {
          const contract = new ethers.Contract(
            tokenInfo.address,
            ERC20_ABI,
            provider
          );
          const balance = await contract.balanceOf(address);
          const balanceFormatted = ethers.formatUnits(
            balance,
            tokenInfo.decimals
          );

          return {
            address: tokenInfo.address,
            symbol: tokenInfo.symbol,
            name: tokenInfo.name,
            decimals: tokenInfo.decimals,
            balance: balance.toString(),
            balanceFormatted: parseFloat(balanceFormatted).toFixed(6),
          } as Token;
        } catch (error) {
          console.error(
            `Error fetching balance for ${tokenInfo.symbol}:`,
            error
          );
          return null;
        }
      });

      const results = await Promise.all(tokenPromises);
      const validTokens = results.filter(
        (token): token is Token =>
          token !== null && parseFloat(token.balanceFormatted) > 0
      );

      setTokens(validTokens);
    } catch (error) {
      console.error("Error fetching token balances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCustomToken = async (contractAddress: string) => {
    if (!chainId || typeof window.ethereum === "undefined") {
      throw new Error("Wallet not connected");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        ERC20_ABI,
        provider
      );

      const [name, symbol, decimals] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
      ]);

      const newToken = {
        address: contractAddress,
        symbol,
        name,
        decimals: Number(decimals),
        balance: "0",
        balanceFormatted: "0",
      };

      setCustomTokens((prev) => [...prev, newToken]);
      return newToken;
    } catch (error) {
      console.error("Error adding custom token:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTokenBalances();
  }, [address, chainId, customTokens]);

  return {
    tokens,
    isLoading,
    addCustomToken,
    refetch: fetchTokenBalances,
  };
};
