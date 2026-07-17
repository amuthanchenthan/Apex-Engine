const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying StrategyManager...");

    const StrategyManager = await hre.ethers.getContractFactory("StrategyManager");

    const strategyManager = await StrategyManager.deploy();

    // Wait for deployment (ethers v6)
    await strategyManager.waitForDeployment();

    const address = await strategyManager.getAddress();

    console.log("================================");
    console.log("✅ Contract deployed!");
    console.log("Network :", hre.network.name);
    console.log("Address :", address);
    console.log("================================");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});