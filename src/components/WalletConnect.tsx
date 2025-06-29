import React from "react";
import { Wallet, Power, Download, ExternalLink } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { SUPPORTED_NETWORKS } from "../utils/network.ts";

export const WalletConnect: React.FC = () => {
  const {
    wallet,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    isMetaMaskInstalled,
  } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const currentNetwork = wallet.chainId
    ? SUPPORTED_NETWORKS[wallet.chainId]
    : null;

  if (!isMetaMaskInstalled) {
    return (
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                MetaMask Required
              </h3>
              <p className="text-orange-200 text-sm">
                Install MetaMask to connect your wallet and track your portfolio
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              window.open("https://metamask.io/download/", "_blank")
            }
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Install MetaMask
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
          <p className="text-orange-200 text-sm">
            <strong>What is MetaMask?</strong> MetaMask is a crypto wallet that
            lets you interact with Ethereum and other blockchains directly from
            your browser. It's free, secure, and required to use this portfolio
            tracker.
          </p>
        </div>
      </div>
    );
  }

  if (!wallet.isConnected) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-white text-xl font-bold mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-gray-400 mb-6">
            Connect your MetaMask wallet to start tracking your crypto portfolio
          </p>

          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 px-8 py-4 rounded-xl font-medium text-white flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl"
          >
            <Wallet className="w-5 h-5" />
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect MetaMask"
            )}
          </button>

          <p className="text-gray-500 text-xs mt-4">
            Make sure MetaMask is unlocked and ready to connect
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-medium">
              {wallet.ensName || formatAddress(wallet.address!)}
            </p>
            <p className="text-gray-400 text-sm">
              {parseFloat(wallet.balance).toFixed(4)}{" "}
              {currentNetwork?.symbol || "ETH"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Network Switcher */}
          <div className="flex items-center gap-1">
            {Object.values(SUPPORTED_NETWORKS).map((network) => (
              <button
                key={network.chainId}
                onClick={() => switchNetwork(network.chainId)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  wallet.chainId === network.chainId
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                title={`Switch to ${network.name}`}
              >
                {network.name}
              </button>
            ))}
          </div>

          <button
            onClick={disconnectWallet}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            title="Disconnect Wallet"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
