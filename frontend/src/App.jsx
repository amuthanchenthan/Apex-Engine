import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import StrategyManager from "./pages/StrategyManager/StrategyManager";
import Wallet from "./pages/Wallet/Wallet";
import Analytics from "./pages/Analytics/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/strategies"
  element={
    <ProtectedRoute>
      <StrategyManager />
    </ProtectedRoute>
  }
/>
    <Route
    path="/wallet"
    element={
        <ProtectedRoute>
            <Wallet />
        </ProtectedRoute>
    }
/>
    <Route
    path="/analytics"
    element={
        <ProtectedRoute>
            <Analytics />
        </ProtectedRoute>
    }
/>

    </Routes>
  );
}

export default App;