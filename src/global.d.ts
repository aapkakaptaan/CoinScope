export {};

declare global {
  interface EthereumProvider extends ethers.Eip1193Provider {
    isMetaMask?: boolean;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  }
  interface Window {
    ethereum?: import("ethers").Eip1193Provider; // if using ethers 6+
  }
}
