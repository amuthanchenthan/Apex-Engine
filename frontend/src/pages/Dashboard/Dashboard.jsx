import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import TopNavbar from "../../components/layout/TopNavbar";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatsCards from "../../components/dashboard/StatsCards";
import WalletCard from "../../components/dashboard/WalletCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";

import {
  connectWallet,
  disconnectWallet,
  getCurrentWallet,
} from "../../services/walletService";

import {
  getWallet,
  saveWallet,
  removeWallet,
} from "../../services/walletApi";

import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [wallet, setWallet] = useState({
    address: "",
    network: "",
    balance: "",
    connected: false,
    connectedAt: null,
  });

  const [loadingWallet, setLoadingWallet] = useState(false);

  /* ==========================================
      Check Wallet On Page Load
  ========================================== */

  useEffect(() => {

    const initializeWallet = async () => {

      try {

        /* -----------------------------
            Wallet stored in MongoDB
        ------------------------------ */

        const dbResponse = await getWallet();

        const savedWallet = dbResponse.wallet;

        /* -----------------------------
            Wallet currently open
            in MetaMask
        ------------------------------ */

        const metamaskWallet = await getCurrentWallet();

        /*
            No wallet stored
        */

        if (!savedWallet?.connected) {

          setWallet({
            address: "",
            network: "",
            balance: "",
            connected: false,
            connectedAt: null,
          });

          return;

        }

        /*
            User disconnected MetaMask
        */

        if (!metamaskWallet) {

          await removeWallet();

          setWallet({
            address: "",
            network: "",
            balance: "",
            connected: false,
            connectedAt: null,
          });

          return;

        }

        /*
            Wrong wallet opened
        */

        if (
          metamaskWallet.address.toLowerCase() !==
          savedWallet.address.toLowerCase()
        ) {

          alert(
            "A different MetaMask wallet is open.\nPlease switch to your linked wallet."
          );

          await removeWallet();

          disconnectWallet();

          setWallet({
            address: "",
            network: "",
            balance: "",
            connected: false,
            connectedAt: null,
          });

          return;

        }

        /*
            Correct wallet
        */

        setWallet({

          ...savedWallet,

          connected: true,

        });

      }

      catch (error) {

        console.log(error);

      }

    };

    initializeWallet();

  }, []);

  /* ==========================================
      Connect Wallet
  ========================================== */

  const handleConnectWallet = async () => {

    try {

      setLoadingWallet(true);

      const data = await connectWallet();

      const response = await saveWallet({

        address: data.address,

        network: data.network,

        balance: data.balance,

      });

      setWallet(response.wallet);

      localStorage.setItem("walletConnected", "true");

    }

    catch (error) {

      console.error(error);

      alert(error.response?.data?.message || error.message);

    }

    finally {

      setLoadingWallet(false);

    }

  };

  /* ==========================================
      Disconnect Wallet
  ========================================== */

  const handleDisconnectWallet = async () => {

    try {

      await removeWallet();

      disconnectWallet();

      setWallet({

        address: "",

        network: "",

        balance: "",

        connected: false,

        connectedAt: null,

      });

    }

    catch (error) {

      console.log(error);

    }

  };

  /* ==========================================
      Logout
  ========================================== */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("walletConnected");

    navigate("/login");

  };

  return (

    <div className="dashboard-layout">

      <Sidebar onLogout={handleLogout} />

      <main className="dashboard-main">

        <TopNavbar
          user={user}
          wallet={wallet}
        />

        <DashboardHero
          user={user}
          wallet={wallet}
        />

        <StatsCards
          wallet={wallet}
        />

        <div className="dashboard-grid">

          <WalletCard

            wallet={wallet}

            loading={loadingWallet}

            connectWallet={handleConnectWallet}

            disconnectWallet={handleDisconnectWallet}

          />

          <QuickActions />

        </div>

        <RecentActivity />

      </main>

    </div>

  );

}

export default Dashboard;