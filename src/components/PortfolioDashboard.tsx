import React, { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useTokenBalances } from "../hooks/useTokenBalances";
import { useTokenPrices } from "../hooks/useTokenPrices";
import { usePriceAlerts } from "../hooks/usePriceAlerts";
import { WalletConnect } from "./WalletConnect";
import { PortfolioSummary } from "./PortfolioSummary";
import { SearchFilter } from "./SearchFilter";
import { TokenList } from "./TokenList";
import { AddCustomToken } from "./AddCustomToken";
import { PriceAlerts } from "./PriceAlerts";
import { TOKEN_ID_MAP } from "../utils/api";
import toast from "react-hot-toast";

interface PortfolioDashboardProps {
  wallet: any;
}

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({
  wallet,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddToken, setShowAddToken] = useState(false);
  const [activeTab, setActiveTab] = useState<"portfolio" | "alerts">(
    "portfolio"
  );

  const { tokens, isLoading, addCustomToken, refetch } = useTokenBalances(
    wallet.address,
    wallet.chainId
  );

  const {
    data: priceData,
    isLoading: isPriceLoading,
    refetch: refetchPrices,
  } = useTokenPrices(tokens);
  const { alerts, addAlert, removeAlert, toggleAlert } = usePriceAlerts(
    priceData || {}
  );

  // Combine token data with prices
  const tokensWithPrices = useMemo(() => {
    if (!priceData) return tokens;

    return tokens.map((token) => {
      const tokenId = TOKEN_ID_MAP[token.symbol];
      const priceInfo = tokenId ? priceData[tokenId] : null;

      if (priceInfo) {
        const price = priceInfo.usd || priceInfo.current_price;
        const priceChange24h =
          priceInfo.usd_24h_change || priceInfo.price_change_percentage_24h;
        const totalValue = parseFloat(token.balanceFormatted) * price;

        return {
          ...token,
          price,
          priceChange24h,
          totalValue,
        };
      }

      return token;
    });
  }, [tokens, priceData]);

  const handleAddCustomToken = async (address: string) => {
    try {
      await addCustomToken(address);
      toast.success("Token added successfully!");
    } catch (error) {
      throw error;
    }
  };

  const handleRefresh = async () => {
    toast.promise(Promise.all([refetch(), refetchPrices()]), {
      loading: "Refreshing portfolio...",
      success: "Portfolio updated!",
      error: "Failed to refresh portfolio",
    });
  };

  const ethPrice =
    priceData?.ethereum?.usd || priceData?.ethereum?.current_price;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Track your crypto holdings in real-time
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isLoading || isPriceLoading}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
            title="Refresh Portfolio"
          >
            <RefreshCw
              className={`w-5 h-5 ${
                isLoading || isPriceLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Wallet Connection */}
      <WalletConnect />

      {wallet.isConnected && (
        <>
          {/* Portfolio Summary */}
          <PortfolioSummary
            tokens={tokensWithPrices}
            ethBalance={wallet.balance}
            ethPrice={ethPrice}
          />

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-1">
            {[
              { id: "portfolio", label: "Portfolio" },
              { id: "alerts", label: `Alerts (${alerts.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "portfolio" && (
            <>
              {/* Search and Filter */}
              <SearchFilter
                onSearch={setSearchQuery}
                onAddCustomToken={() => setShowAddToken(true)}
              />

              {/* Token List */}
              <TokenList
                tokens={tokensWithPrices}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSetAlert={addAlert}
              />
            </>
          )}

          {activeTab === "alerts" && (
            <PriceAlerts
              alerts={alerts}
              onToggleAlert={toggleAlert}
              onRemoveAlert={removeAlert}
            />
          )}

          {/* Add Custom Token Modal */}
          <AddCustomToken
            isOpen={showAddToken}
            onClose={() => setShowAddToken(false)}
            onAddToken={handleAddCustomToken}
          />
        </>
      )}
    </div>
  );
};
