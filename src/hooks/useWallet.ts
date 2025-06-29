import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { WalletState } from "../types";
import { SUPPORTED_NETWORKS } from "../utils/network.ts";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    ensName: null,
    chainId: null,
    balance: "0",
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Check if MetaMask is installed
  const checkMetaMaskInstallation = useCallback(() => {
    const isInstalled =
      typeof window.ethereum !== "undefined" &&
      window.ethereum.isMetaMask === true;
    setIsMetaMaskInstalled(isInstalled);
    return isInstalled;
  }, []);

  const checkConnection = useCallback(async () => {
    if (!checkMetaMaskInstallation()) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(address);

        // Try to resolve ENS name
        let ensName = null;
        try {
          ensName = await provider.lookupAddress(address);
        } catch (e) {
          // ENS lookup failed, continue without it
        }

        setWallet({
          isConnected: true,
          address,
          ensName,
          chainId: Number(network.chainId),
          balance: ethers.formatEther(balance),
        });
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  }, [checkMetaMaskInstallation]);

  const connectWallet = async () => {
    if (!checkMetaMaskInstallation()) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await checkConnection();
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        // User rejected the request
        console.log("User rejected the connection request");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      ensName: null,
      chainId: null,
      balance: "0",
    });
  };

  const switchNetwork = async (chainId: number) => {
    if (!checkMetaMaskInstallation()) return;

    const network = SUPPORTED_NETWORKS[chainId];
    if (!network) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: network.name,
                nativeCurrency: {
                  name: network.symbol,
                  symbol: network.symbol,
                  decimals: 18,
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.blockExplorer],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding network:", addError);
        }
      }
    }
  };

  useEffect(() => {
    // Initial check for MetaMask installation
    checkMetaMaskInstallation();

    // Check connection on mount
    checkConnection();

    if (typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        checkConnection();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [checkConnection, checkMetaMaskInstallation]);

  return {
    wallet,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    isMetaMaskInstalled,
  };
};
