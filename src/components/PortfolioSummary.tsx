import React from "react";
import { TrendingUp, DollarSign, Coins, PieChart } from "lucide-react";
import { Token } from "../types";

interface PortfolioSummaryProps {
  tokens: Token[];
  ethBalance: string;
  ethPrice?: number;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  tokens,
  ethBalance,
  ethPrice,
}) => {
  const totalValue = tokens.reduce(
    (sum, token) => sum + (token.totalValue || 0),
    0
  );
  const ethValue = ethPrice ? parseFloat(ethBalance) * ethPrice : 0;
  const grandTotal = totalValue + ethValue;

  const tokensWithValue = tokens.filter(
    (token) => token.totalValue && token.totalValue > 0
  );
  const avgChange24h =
    tokensWithValue.length > 0
      ? tokensWithValue.reduce(
          (sum, token) => sum + (token.priceChange24h || 0),
          0
        ) / tokensWithValue.length
      : 0;

  const stats = [
    {
      label: "Total Portfolio Value",
      value: `$${grandTotal.toLocaleString()}`,
      icon: DollarSign,
      color: "from-blue-500 to-purple-600",
    },
    {
      label: "Total Tokens",
      value: tokens.length.toString(),
      icon: Coins,
      color: "from-emerald-500 to-blue-600",
    },
    {
      label: "Avg 24h Change",
      value: `${avgChange24h >= 0 ? "+" : ""}${avgChange24h.toFixed(2)}%`,
      icon: TrendingUp,
      color:
        avgChange24h >= 0
          ? "from-emerald-500 to-green-600"
          : "from-red-500 to-pink-600",
    },
    {
      label: "ETH Balance",
      value: `${parseFloat(ethBalance).toFixed(4)} ETH`,
      icon: PieChart,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <p className="text-white text-xl font-bold mt-1">{stat.value}</p>
            </div>
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
