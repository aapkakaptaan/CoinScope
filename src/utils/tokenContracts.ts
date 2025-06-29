export const COMMON_TOKENS: Record<
  number,
  Array<{ address: string; symbol: string; name: string; decimals: number }>
> = {
  1: [
    // Ethereum
    {
      address: "0xA0b8624F4878Ea07d5f27602240920E81d3db064",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
    },
    {
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      symbol: "LINK",
      name: "Chainlink",
      decimals: 18,
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      symbol: "UNI",
      name: "Uniswap",
      decimals: 18,
    },
  ],
  137: [
    // Polygon
    {
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      symbol: "USDC",
      name: "USD Coin (PoS)",
      decimals: 6,
    },
    {
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      symbol: "USDT",
      name: "Tether USD (PoS)",
      decimals: 6,
    },
    {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      symbol: "DAI",
      name: "Dai Stablecoin (PoS)",
      decimals: 18,
    },
  ],
};

export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];
