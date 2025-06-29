const COINGECKO_API = "https://api.coingecko.com/api/v3";

export const fetchTokenPrices = async (tokenIds: string[]) => {
  if (tokenIds.length === 0) return {};

  const ids = tokenIds.join(",");
  const response = await fetch(
    `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token prices");
  }

  return response.json();
};

export const searchCoins = async (query: string) => {
  const response = await fetch(`${COINGECKO_API}/search?query=${query}`);

  if (!response.ok) {
    throw new Error("Failed to search coins");
  }

  return response.json();
};

export const getTokenByContract = async (
  address: string,
  platform: string = "ethereum"
) => {
  const response = await fetch(
    `${COINGECKO_API}/coins/${platform}/contract/${address}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token data");
  }

  return response.json();
};

// Map common token symbols to CoinGecko IDs
export const TOKEN_ID_MAP: Record<string, string> = {
  ETH: "ethereum",
  MATIC: "matic-network",
  USDC: "usd-coin",
  USDT: "tether",
  DAI: "dai",
  WBTC: "wrapped-bitcoin",
  LINK: "chainlink",
  UNI: "uniswap",
};
