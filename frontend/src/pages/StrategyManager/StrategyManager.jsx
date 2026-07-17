import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {

    saveExecution,

    getExecutions,
    getLatestBuy,

} from "../../services/executionApi";

import Sidebar from "../../components/layout/Sidebar";
import TopNavbar from "../../components/layout/TopNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getContract } from "../../blockchain/contract";
import { loadStages, saveStages } from "../../services/stageApi";

import "./StrategyManager.css";

function StrategyManager() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    /* ===========================================
        STATES
    =========================================== */

    const [strategies, setStrategies] = useState([]);

    const [strategyStages, setStrategyStages] = useState({});

    const [executionHistory, setExecutionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(true);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [botRunning, setBotRunning] = useState(false);

    const [currentPrice, setCurrentPrice] = useState(null);

    const [name, setName] = useState("");

    const [pair, setPair] = useState("");

    const [buyPrice, setBuyPrice] = useState("");

    const [sellPrice, setSellPrice] = useState("");
    const [archivedStrategies, setArchivedStrategies] = useState([]);
    const [buyExecutions, setBuyExecutions] = useState({});

    /* ===========================================
        LOAD STRATEGIES
    =========================================== */

    const loadStrategies = async () => {

        try {

            const contract = await getContract();

            const data = await contract.getMyStrategies();

            const formatted = data.map((strategy) => ({

                id: Number(strategy.id),

                name: String(strategy.name),

                tokenPair: String(strategy.tokenPair),

                buyPrice: Number(strategy.buyPrice),

                sellPrice: Number(strategy.sellPrice),

                active: strategy.active,

            }));

            setStrategies(formatted);

            setStrategyStages((prev) => {

                const updated = { ...prev };

                formatted.forEach((strategy) => {

                    if (!updated[strategy.id]) {

                        updated[strategy.id] = "WAIT_BUY";

                    }

                });

                return updated;

            });

        }

        catch (err) {

            console.error(err);

        }

    };

    /* ===========================================
        LIVE ETH PRICE
    =========================================== */

    const fetchPrice = async () => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );

        const data = await response.json();

        const price = data.ethereum.usd;

        setCurrentPrice(price);

        return price;
    } catch (err) {
        console.error(err);
        return null;
    }
    };


    /* ===========================================
        INITIAL LOAD
    =========================================== */

    useEffect(() => {

    const initialize = async () => {

        await loadStrategies();
        const response = await loadStages();

        setStrategyStages(response.data.stages || {});

        await fetchPrice();

        try {

            const response = await getExecutions();

            const history = response.executions;

            const formatted = history.map((item) => ({

                id: item._id,
                strategyId: item.strategyId,

                strategy: item.strategy,

                pair: item.pair,

                action: item.action,

                price: item.price,

                profit: item.profit,

                roi: item.roi,

                time: new Date(item.createdAt).toLocaleString(),

            }));

            setExecutionHistory(formatted);

        }

        catch (err) {

            console.log(err);

        }

    };

    initialize();

    const priceInterval = setInterval(fetchPrice, 10000);

    return () => {

        clearInterval(priceInterval);

        if (window.botInterval) {

            clearInterval(window.botInterval);

        }

    };

    }, []);
        /* ===========================================
        CREATE STRATEGY
    =========================================== */

    const createStrategy = async () => {

        if (
            !name ||
            !pair ||
            !buyPrice ||
            !sellPrice
        ) {

            alert("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);

            const contract = await getContract();

            const tx = await contract.createStrategy(

                name,

                pair,

                Number(buyPrice),

                Number(sellPrice)

            );

            await tx.wait();

            setName("");

            setPair("");

            setBuyPrice("");

            setSellPrice("");

            await loadStrategies();

            alert("✅ Strategy Created Successfully!");

        }

        catch (err) {

            console.error(err);

            alert(err.reason || err.message);

        }

        finally {

            setLoading(false);

        }

    };

    /* ===========================================
        ACTIVATE / DEACTIVATE
    =========================================== */

    const toggleStrategy = async (id) => {

        try {

            const contract = await getContract();

            const tx = await contract.toggleStrategy(id);

            await tx.wait();

            await loadStrategies();

        }

        catch (err) {

            console.error(err);

            alert("Unable to update strategy.");

        }

    };

    /* ===========================================
        EXECUTE ONE STRATEGY
    =========================================== */

    const archiveStrategy = (id) => {

        const strategy = strategies.find(s => s.id === id);

        if (!strategy) return;

        setArchivedStrategies(prev => [...prev, strategy]);

        setStrategies(prev =>
            prev.filter(s => s.id !== id)
        );

    };
    const deleteStrategy = (id) => {

        if (!window.confirm("Delete permanently?")) return;

        setArchivedStrategies(prev =>
            prev.filter(strategy => strategy.id !== id)
        );

    };

    const executeStrategy = async (
        strategy,
        latestPrice,
        latestStages,
        manual = false
    ) => {

        if (!latestPrice || !strategy.active) {

            return latestStages;

        }

        const stage = latestStages[strategy.id] || "WAIT_BUY";

        if (stage === "COMPLETED") {

            return latestStages;

        }

        let action = null;

        let updatedStages = latestStages;

        // ============================
        // BUY
        // ============================

        if (

            stage === "WAIT_BUY" &&
            latestPrice <= strategy.buyPrice

        ) {

            action = "BUY";

            updatedStages = {

                ...latestStages,

                [strategy.id]: "WAIT_SELL",

            };

            setStrategyStages(updatedStages);

            await saveStages(updatedStages);

        }

        // ============================
        // SELL
        // ============================

        else if (

            stage === "WAIT_SELL" &&
            latestPrice >= strategy.sellPrice

        ) {

            action = "SELL";

            updatedStages = {

                ...latestStages,

                [strategy.id]: "COMPLETED",

            };

            setStrategyStages(updatedStages);

            await saveStages(updatedStages);

        }

        // ============================
        // NO CONDITION MET
        // ============================

        else {

            if (manual) {

                alert("No execution condition met.");

            }

            return latestStages;

        }

        // ============================
        // CALCULATE PROFIT
        // ============================

        let executedBuyPrice = strategy.buyPrice;

        let profit = 0;

        let roi = 0;

        if (action === "SELL") {

            const buyTrade = await getLatestBuy(strategy.id);
            console.log("BUY TRADE:", buyTrade);

            if (buyTrade) {

                executedBuyPrice = buyTrade.price;

            }

            profit = latestPrice - executedBuyPrice;
            console.log({
                action,
                latestPrice,
                executedBuyPrice,
                profit,
                roi
            });

            roi = (profit / executedBuyPrice) * 100;

        }

        // ============================
        // SAVE EXECUTION
        // ============================

        await saveExecution({

            strategyId: strategy.id,

            strategy: strategy.name,

            pair: strategy.tokenPair,

            action,

            price: latestPrice,

            buyPrice: executedBuyPrice,

            sellPrice: action === "SELL" ? latestPrice : null,

            profit,

            roi,

        });

        // ============================
        // UPDATE HISTORY
        // ============================

        setExecutionHistory(prev => [

            {

                id: Date.now(),

                strategyId: strategy.id,

                strategy: strategy.name,

                pair: strategy.tokenPair,

                action,

                price: latestPrice,

                profit,

                roi,

                time: new Date().toLocaleTimeString(),

            },

            ...prev,

        ]);

        // ============================
        // NOTIFICATION
        // ============================

        toast.success(

            `${action} executed successfully for "${strategy.name}" at $${latestPrice}`,

            {

                position: "top-right",

                autoClose: 3000,

            }

        );

        return updatedStages;

    };

    /* ===========================================
        START / STOP BOT
    =========================================== */

    const runBot = () => {
    if (botRunning) {
        clearInterval(window.botInterval);
        setBotRunning(false);
        return;
    }

    setBotRunning(true);

    window.botInterval = setInterval(async () => {
        try {
            const latestPrice = await fetchPrice();

            if (!latestPrice) return;

            const response = await loadStages();

            let latestStages = response.data.stages || {};

            for (const strategy of strategies) {
                if (!strategy.active) continue;

                latestStages = await executeStrategy(
                    strategy,
                    latestPrice,
                    latestStages
                );
            }
        } catch (err) {
            console.error("Bot error:", err);
        }
    }, 5000);
    };

    /* ===========================================
        SEARCH
    =========================================== */

    const filteredStrategies = strategies.filter((strategy) =>

        strategy.name

            .toLowerCase()

            .includes(search.toLowerCase())

        ||

        strategy.tokenPair

            .toLowerCase()

            .includes(search.toLowerCase())

    );
    const completedStrategies = Object.values(strategyStages).filter(
        stage => stage === "COMPLETED"
    ).length;
    console.log("Execution History:", executionHistory);
    const totalProfit = executionHistory
        .filter(item => item.action === "SELL")
        .reduce((sum, item) => sum + (item.profit || 0), 0);

    const totalSellTrades = executionHistory.filter(
        item => item.action === "SELL"
    ).length;

    const successfulTrades = executionHistory.filter(
        item => item.action === "SELL" && item.profit > 0
    ).length;

    const successRate =
        totalSellTrades === 0
            ? 0
            : ((successfulTrades / totalSellTrades) * 100);
    const executionMap = {};

    executionHistory.forEach(item => {

        if (item.action === "SELL") {

            executionMap[item.strategyId] = item;

        }

    });

    /* ===========================================
        LOGOUT
    =========================================== */

    const handleLogout = () => {

        if (window.botInterval) {

            clearInterval(window.botInterval);

        }

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("walletConnected");

        navigate("/login");

    };
    console.log("Strategies:", strategies);
    console.log("Stages:", strategyStages);
    return (

        <div className="strategy-page">

            <Sidebar onLogout={handleLogout} />

            <main className="strategy-main">

                <TopNavbar
                    user={user}
                    showSearch={false}
                />

                {/* =====================================
                    HEADER
                ====================================== */}
                <div className="strategy-summary">

    <div className="summary-card">

        <h2>{strategies.length}</h2>

        <p>Total Strategies</p>

    </div>

    <div className="summary-card">

        <h2>
            {strategies.filter(s => s.active).length}
        </h2>

        <p>Active</p>

    </div>

    <div className="summary-card">

        <h2>{completedStrategies}</h2>

        <p>Completed</p>

    </div>

    <div className="summary-card">

        <h2
            style={{
                color:
                    totalProfit >= 0
                        ? "#22C55E"
                        : "#EF4444",
            }}
        >

            ${totalProfit.toFixed(2)}

        </h2>

        <p>Total Profit</p>

    </div>

    <div className="summary-card">

        <h2>

            {successRate.toFixed(1)}%

        </h2>

        <p>Success Rate</p>

    </div>

</div>


                <div className="strategy-card">

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "20px",
                        }}
                    >

                        <div>

                            <h2 className="strategy-title">

                                Blockchain Strategy Manager

                            </h2>

                            <p
                                style={{
                                    color: "#9CA3AF",
                                    marginTop: 6,
                                }}
                            >

                                Create and simulate blockchain trading strategies.

                            </p>

                        </div>

                        <button

                            className="create-btn"

                            style={{
                                maxWidth: 220,
                            }}

                            onClick={runBot}

                        >

                            {

                                botRunning

                                    ? "⏹ Stop Bot"

                                    : "▶ Start Bot"

                            }

                        </button>

                    </div>

                    <div
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                            fontWeight: 600,
                            color: "#60A5FA",
                            fontSize: "18px",
                        }}
                    >

                        Live ETH Price :

                        {

                            currentPrice

                                ? ` $${currentPrice}`

                                : " Loading..."

                        }

                    </div>

                </div>

                {/* =====================================
                    CREATE STRATEGY
                ====================================== */}

                <div className="strategy-card">

                    <h2 className="strategy-title">

                        Create Strategy

                    </h2>

                    <div className="strategy-form">

                        <input

                            className="strategy-input"

                            placeholder="Strategy Name"

                            value={name}

                            onChange={(e) =>
                                setName(e.target.value)
                            }

                        />

                        <input

                            className="strategy-input"

                            placeholder="ETH/USDT"

                            value={pair}

                            onChange={(e) =>
                                setPair(e.target.value)
                            }

                        />

                        <input

                            className="strategy-input"

                            type="number"

                            placeholder="Buy Price"

                            value={buyPrice}

                            onChange={(e) =>
                                setBuyPrice(e.target.value)
                            }

                        />

                        <input

                            className="strategy-input"

                            type="number"

                            placeholder="Sell Price"

                            value={sellPrice}

                            onChange={(e) =>
                                setSellPrice(e.target.value)
                            }

                        />

                    </div>

                    <button

                        className="create-btn"

                        onClick={createStrategy}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Creating..."

                                : "Create Strategy"

                        }

                    </button>

                </div>

                {/* =====================================
                    MY STRATEGIES
                ====================================== */}

                <div className="strategy-card">

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 20,
                            marginBottom: 25,
                        }}
                    >

                        <h2 className="strategy-title">

                            My Strategies

                        </h2>

                        <input

                            className="strategy-input"

                            placeholder="Search Strategy..."

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                            style={{
                                maxWidth: 280,
                                margin: 0,
                            }}

                        />

                    </div>

                    {

                        filteredStrategies.length === 0

                            ? (

                                <p>

                                    No strategies found.

                                </p>

                            )

                            : (

                                <div className="strategy-grid">
                                                                    {

                                        filteredStrategies.map((strategy) => {
                                            const execution = executionMap[strategy.id];
                                            return(
                                            <div

                                                key={strategy.id}

                                                className="strategy-item"

                                            >

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        marginBottom: 12,
                                                    }}
                                                >

                                                    <h3
                                                        style={{
                                                            margin: 0,
                                                        }}
                                                    >

                                                        {strategy.name}

                                                    </h3>

                                                    <span
                                                        className={
                                                            strategy.active
                                                                ? "status-active"
                                                                : "status-inactive"
                                                        }
                                                    >

                                                        {

                                                            strategy.active

                                                                ? "Active"

                                                                : "Inactive"

                                                        }

                                                    </span>

                                                </div>

                                                <p>

                                                    <strong>Pair:</strong>{" "}

                                                    {strategy.tokenPair}

                                                </p>

                                                <p>

                                                    <strong>Buy Price:</strong>{" "}

                                                    ${strategy.buyPrice}

                                                </p>

                                                <p>

                                                    <strong>Sell Price:</strong>{" "}

                                                    ${strategy.sellPrice}

                                                </p>

                                                <p>

                                                    <strong>Current Price:</strong>{" "}

                                                    {

                                                        currentPrice

                                                            ? `$${currentPrice}`

                                                            : "--"

                                                    }

                                                </p>

                                                <p>

                                                    <strong>Bot Stage:</strong>{" "}
                                                    {
                                                        execution && (

                                                            <>

                                                                <p>

                                                                    <strong>Profit:</strong>

                                                                    <span
                                                                        style={{
                                                                            color:
                                                                                execution.profit >= 0
                                                                                    ? "#22C55E"
                                                                                    : "#EF4444",
                                                                            fontWeight: "bold",
                                                                        }}
                                                                    >

                                                                        {

                                                                            execution.profit >= 0

                                                                                ? ` +$${execution.profit.toFixed(2)}`

                                                                                : ` -$${Math.abs(execution.profit).toFixed(2)}`

                                                                        }

                                                                    </span>

                                                                </p>

                                                                <p>

                                                                    <strong>ROI:</strong>

                                                                    {execution.roi.toFixed(2)}%

                                                                </p>

                                                            </>

                                                        )
                                                    }

                                                    {

                                                        strategyStages[strategy.id] === "WAIT_BUY"

                                                            ? "🟡 Waiting To Buy"

                                                            : strategyStages[strategy.id] === "WAIT_SELL"

                                                            ? "🔵 Holding"

                                                            : "✅ Completed"

                                                    }

                                                </p>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 10,
                                                        marginTop: 20,
                                                        flexWrap: "wrap",
                                                    }}
                                                >

                                                    <button

                                                        className="create-btn"

                                                        style={{
                                                            flex: 1,
                                                        }}

                                                        onClick={() => executeStrategy(strategy,currentPrice,strategyStages,true)}

                                                        disabled={
                                                            !strategy.active ||
                                                            strategyStages[strategy.id] === "COMPLETED"
                                                        }

                                                    >

                                                        Execute Strategy

                                                    </button>

                                                    <button

                                                        className="toggle-btn"

                                                        onClick={() =>
                                                            toggleStrategy(strategy.id)
                                                        }

                                                    >

                                                        {

                                                            strategy.active

                                                                ? "Deactivate"

                                                                : "Activate"

                                                        }

                                                    </button>
                                                    {

                                                        

                                                            <button

                                                                className="toggle-btn"

                                                                onClick={() => archiveStrategy(strategy.id)}

                                                            >

                                                                Archive

                                                            </button>

                                                        

                                                    }

                                                </div>

                                            </div>
                                            );        
                                        
                                        })

                                    }

                                </div>

                            )

                    }

                </div>

                {/* =====================================
                    EXECUTION HISTORY
                ====================================== */}

                <div
                    className="strategy-card"
                    style={{
                        marginTop: 25,
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >

                        <h2 className="strategy-title">

                            Recent Executions

                        </h2>

                        <button

                            className="toggle-btn"

                            onClick={() => setShowHistory(!showHistory)}

                        >

                            {showHistory ? "Hide" : "Show"}

                        </button>

                    </div>

                    {

                        showHistory && (
                        executionHistory.length === 0

                            ? (

                                <p>

                                    No executions yet.

                                </p>

                            )

                            : (

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                                                        {

                                        executionHistory
                                            .slice(0, 10)
                                            .map((item) => (

                                                <div

                                                    key={item.id}

                                                    className="strategy-item"

                                                >

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            flexWrap: "wrap",
                                                            gap: 15,
                                                        }}
                                                    >

                                                        <div>

                                                            <h4
                                                                style={{
                                                                    marginBottom: 6,
                                                                }}
                                                            >

                                                                {item.strategy}

                                                            </h4>

                                                            <p
                                                                style={{
                                                                    margin: 0,
                                                                    color: "#9CA3AF",
                                                                }}
                                                            >

                                                                {item.pair}

                                                            </p>

                                                        </div>

                                                        <div
                                                            style={{
                                                                textAlign: "center",
                                                            }}
                                                        >

                                                            <span
                                                                style={{
                                                                    fontWeight: 700,

                                                                    color:

                                                                        item.action === "BUY"

                                                                            ? "#22C55E"

                                                                            : "#EF4444",

                                                                    fontSize: 18,
                                                                }}
                                                            >

                                                                {item.action}

                                                            </span>

                                                        </div>

                                                        <div
                                                            style={{
                                                                textAlign: "right",
                                                            }}
                                                        >

                                                            <div>

                                                                ${item.price}

                                                                {

                                                                    item.action === "SELL" && (

                                                                        <>

                                                                            <br />

                                                                            <span

                                                                                style={{

                                                                                    color:

                                                                                        item.profit >= 0

                                                                                            ? "#22C55E"

                                                                                            : "#EF4444",

                                                                                    fontWeight: "bold",

                                                                                }}

                                                                            >

                                                                                {

                                                                                    item.profit >= 0

                                                                                        ? `+$${item.profit.toFixed(2)}`

                                                                                        : `-$${Math.abs(item.profit).toFixed(2)}`

                                                                                }

                                                                            </span>

                                                                            <br />

                                                                            <small>

                                                                                ROI: {item.roi.toFixed(2)}%

                                                                            </small>

                                                                        </>

                                                                    )

                                                                }

                                                            </div>

                                                            <small>

                                                                {item.createdAt

                                                                    ? new Date(item.createdAt).toLocaleString()

                                                                    : item.time}

                                                            </small>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))

                                        }

                                    </div>

                                )
                            )        
                        }

                    </div>
                    <ToastContainer />
                {/* =====================================
                        ARCHIVED STRATEGIES
                    ===================================== */}

                <div
                    className="strategy-card"
                    style={{
                        marginTop: 25,
                    }}
                >

                    <h2 className="strategy-title">

                        Archived Strategies

                    </h2>

                    {

                        archivedStrategies.length === 0

                            ? (

                                <p>No archived strategies.</p>

                            )

                            : (

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 15,
                                    }}
                                >

                                    {

                                        archivedStrategies.map((strategy) => (

                                            <div

                                                key={strategy.id}

                                                className="strategy-item"

                                            >

                                                <h3>{strategy.name}</h3>

                                                <p>

                                                    Pair: {strategy.tokenPair}

                                                </p>

                                                <p>

                                                    Buy: ${strategy.buyPrice}

                                                </p>

                                                <p>

                                                    Sell: ${strategy.sellPrice}

                                                </p>

                                                <button

                                                    className="toggle-btn"

                                                    onClick={() =>
                                                        deleteStrategy(strategy.id)
                                                    }

                                                >

                                                    Delete Permanently

                                                </button>

                                            </div>

                                        ))

                                    }

                                </div>

                            )

                    }

                </div>
            </main>

        </div>
         );

}

export default StrategyManager;