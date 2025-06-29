import React, { useMemo } from "react";
import { Loader2, Coins } from "lucide-react";
import { Token } from "../types";
import { TokenItem } from "./TokenItem";

interface TokenListProps {
  tokens: Token[];
  isLoading: boolean;
  searchQuery: string;
  onSetAlert: (
    tokenSymbol: string,
    targetPrice: number,
    condition: "above" | "below"
  ) => void;
}

export const TokenList: React.FC<TokenListProps> = ({
  tokens,
  isLoading,
  searchQuery,
  onSetAlert,
}) => {
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;

    const query = searchQuery.toLowerCase();
    return tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
    );
  }, [tokens, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading tokens...</span>
        </div>
      </div>
    );
  }

  if (filteredTokens.length === 0) {
    return (
      <div className="text-center py-12">
        <Coins className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-white text-lg font-medium mb-2">
          {searchQuery ? "No tokens found" : "No tokens in wallet"}
        </h3>
        <p className="text-gray-400">
          {searchQuery
            ? "Try adjusting your search terms"
            : "Add some tokens to your wallet or try adding a custom token"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTokens.map((token) => (
        <TokenItem key={token.address} token={token} onSetAlert={onSetAlert} />
      ))}
    </div>
  );
};
