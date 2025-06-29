import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Bell,
  BellOff,
  AlertTriangle,
} from "lucide-react";
import { Token } from "../types";

interface TokenItemProps {
  token: Token;
  onSetAlert: (
    tokenSymbol: string,
    targetPrice: number,
    condition: "above" | "below"
  ) => void;
}

export const TokenItem: React.FC<TokenItemProps> = ({ token, onSetAlert }) => {
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertPrice, setAlertPrice] = useState("");
  const [alertCondition, setAlertCondition] = useState<"above" | "below">(
    "above"
  );

  const handleSetAlert = () => {
    if (!alertPrice || !token.price) return;

    const targetPrice = parseFloat(alertPrice);
    if (isNaN(targetPrice) || targetPrice <= 0) return;

    onSetAlert(token.symbol, targetPrice, alertCondition);
    setShowAlertForm(false);
    setAlertPrice("");
  };

  const priceChangeColor =
    token.priceChange24h && token.priceChange24h >= 0
      ? "text-emerald-400"
      : "text-red-400";

  const PriceChangeIcon =
    token.priceChange24h && token.priceChange24h >= 0
      ? TrendingUp
      : TrendingDown;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {token.symbol.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-white font-medium">{token.symbol}</h3>
            <p className="text-gray-400 text-sm">{token.name}</p>
          </div>
        </div>

        <button
          onClick={() => setShowAlertForm(!showAlertForm)}
          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
          title="Set Price Alert"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Balance</span>
          <span className="text-white font-medium">
            {parseFloat(token.balanceFormatted).toLocaleString()} {token.symbol}
          </span>
        </div>

        {token.price && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Price</span>
              <span className="text-white font-medium">
                ${token.price.toFixed(token.price < 1 ? 6 : 2)}
              </span>
            </div>

            {token.priceChange24h !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">24h Change</span>
                <div className={`flex items-center gap-1 ${priceChangeColor}`}>
                  <PriceChangeIcon className="w-4 h-4" />
                  <span className="font-medium">
                    {token.priceChange24h >= 0 ? "+" : ""}
                    {token.priceChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            )}

            {token.totalValue && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                <span className="text-gray-400 text-sm">Total Value</span>
                <span className="text-white font-bold">
                  ${token.totalValue.toLocaleString()}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {showAlertForm && token.price && (
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-600/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-medium">
              Set Price Alert
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <select
                value={alertCondition}
                onChange={(e) =>
                  setAlertCondition(e.target.value as "above" | "below")
                }
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>

              <input
                type="number"
                step="0.000001"
                placeholder={`Current: $${token.price.toFixed(6)}`}
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSetAlert}
                disabled={!alertPrice}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 px-3 py-2 rounded-lg text-white text-sm font-medium"
              >
                Set Alert
              </button>
              <button
                onClick={() => setShowAlertForm(false)}
                className="px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
