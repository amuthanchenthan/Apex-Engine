import { ethers } from "ethers";
import StrategyManager from "./abi/StrategyManager.json";
const CONTRACT_ADDRESS =
  "0x3F212Ed4192eEBeA47b37468B84a65D9994b5daB";

export async function getContract() {

    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    return new ethers.Contract(
        CONTRACT_ADDRESS,
        StrategyManager.abi,
        signer
    );
}