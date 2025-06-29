import { Network } from "../types";

export const SUPPORTED_NETWORKS: Record<number, Network> = {
  1: {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
  },
  137: {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
  },
};

export const DEFAULT_NETWORK = SUPPORTED_NETWORKS[1];
