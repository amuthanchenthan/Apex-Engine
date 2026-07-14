import { ethers } from "ethers";

/* ==========================================
   Get Network Name
========================================== */

const getNetworkName = (chainId) => {
  switch (chainId) {
    case 1:
      return "Ethereum Mainnet";

    case 11155111:
      return "Sepolia";

    case 137:
      return "Polygon";

    case 80002:
      return "Polygon Amoy";

    case 56:
      return "BNB Smart Chain";

    case 8453:
      return "Base";

    case 42161:
      return "Arbitrum One";

    case 10:
      return "Optimism";

    default:
      return `Chain ${chainId}`;
  }
};

/* ==========================================
   Connect Wallet
========================================== */

export const connectWallet = async () => {

  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }

  // Ask MetaMask to connect
  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  const address = await signer.getAddress();

  // ✅ Get chain directly from MetaMask
  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });

  const chainId = parseInt(chainIdHex, 16);

  const network = getNetworkName(chainId);

  const balanceWei = await provider.getBalance(address);

  const balance = Number(
    ethers.formatEther(balanceWei)
  ).toFixed(4);

  console.log("========== WALLET ==========");
  console.log("Address :", address);
  console.log("Chain ID:", chainId);
  console.log("Network :", network);
  console.log("Balance :", balance);
  console.log("============================");

  return {
    provider,
    signer,
    address,
    network,
    balance,
  };
};

/* ==========================================
   Disconnect Wallet
========================================== */

export const disconnectWallet = () => {

  localStorage.removeItem("wallet");

  localStorage.removeItem("walletConnected");

};

/* ==========================================
   Get Current Wallet
========================================== */

export const getCurrentWallet = async () => {

  const shouldReconnect =
    localStorage.getItem("walletConnected");

  if (!shouldReconnect) {
    return null;
  }

  if (!window.ethereum) {
    return null;
  }

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  if (accounts.length === 0) {
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  // ✅ Get chain directly from MetaMask
  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });

  const chainId = parseInt(chainIdHex, 16);

  const network = getNetworkName(chainId);

  const balanceWei = await provider.getBalance(accounts[0]);

  const balance = Number(
    ethers.formatEther(balanceWei)
  ).toFixed(4);

  return {
    address: accounts[0],
    network,
    balance,
  };
};