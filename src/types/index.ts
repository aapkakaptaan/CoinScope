export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: string;
  price?: number;
  priceChange24h?: number;
  totalValue?: number;
  logoURI?: string;
}

export interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  ensName: string | null;
  chainId: number | null;
  balance: string;
}

export interface PriceAlert {
  id: string;
  tokenSymbol: string;
  targetPrice: number;
  condition: "above" | "below";
  isActive: boolean;
  createdAt: number;
}

export interface Network {
  chainId: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
}
