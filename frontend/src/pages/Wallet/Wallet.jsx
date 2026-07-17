import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import TopNavbar from "../../components/layout/TopNavbar";

import { getCurrentWallet } from "../../services/walletService";

import "./Wallet.css";

function Wallet() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [wallet, setWallet] = useState(null);

    useEffect(() => {

        loadWallet();

    }, []);

    const loadWallet = async () => {

        try {

            const data = await getCurrentWallet();

            setWallet(data);

        }

        catch (err) {

            console.error(err);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("walletConnected");

        navigate("/login");

    };

    return (

        <div className="strategy-page">

            <Sidebar onLogout={handleLogout}/>

            <main className="strategy-main">

                <TopNavbar
                    user={user}
                    showSearch={false}
                />

                <div className="strategy-card">

                    <h2 className="strategy-title">

                        Wallet Information

                    </h2>

                    {

                        wallet ?

                        <>

                            <p>

                                <strong>Address</strong>

                                <br/>

                                {wallet.address}

                            </p>

                            <p>

                                <strong>Network</strong>

                                <br/>

                                {wallet.network}

                            </p>

                            <p>

                                <strong>Balance</strong>

                                <br/>

                                {wallet.balance} ETH

                            </p>

                            <p>

                                <strong>Status</strong>

                                <br/>

                                🟢 Connected

                            </p>

                            <p>

                                <strong>Contract</strong>

                                <br/>

                                0x3F212Ed4192eEBeA47b37468B84a65D9994b5daB

                            </p>

                        </>

                        :

                        <p>Wallet not connected.</p>

                    }

                </div>

            </main>

        </div>

    );

}

export default Wallet;