import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import TopNavbar from "../../components/layout/TopNavbar";

import ProfitChart from "../../components/Charts/ProfitChart";

import { getExecutions } from "../../services/executionApi";
import StrategyProfitChart from "../../components/Charts/StrategyProfitChart";
import "./Analytics.css";

function Analytics() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [executions, setExecutions] = useState([]);

    useEffect(() => {

        const loadExecutions = async () => {

            try {

                const response = await getExecutions();

                setExecutions(response.executions);

            }

            catch (err) {

                console.error(err);

            }

        };

        loadExecutions();

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    };

    return (

        <div className="strategy-page">

            <Sidebar onLogout={handleLogout} />

            <main className="strategy-main">

                <TopNavbar
                    user={user}
                    showSearch={false}
                />

                <div className="analytics-container">

                    <h1>Analytics</h1>

                    <ProfitChart executions={executions} />
                    <StrategyProfitChart executions={executions} />

                </div>

            </main>

        </div>

    );

}

export default Analytics;