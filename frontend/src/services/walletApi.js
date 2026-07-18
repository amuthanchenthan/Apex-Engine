import axios from "axios";

/* ==========================================
   API Configuration
========================================== */

const API = axios.create({
  baseURL: "http://apex-engine-backend.onrender.com/api/wallet",
});

/* ==========================================
   Attach JWT Token Automatically
========================================== */

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;

});

/* ==========================================
   Get Wallet
========================================== */

export const getWallet = async () => {

  const response = await API.get("/me");

  return response.data;

};

/* ==========================================
   Connect Wallet
========================================== */

export const saveWallet = async (walletData) => {

  const response = await API.post(
    "/connect",
    walletData
  );

  return response.data;

};

/* ==========================================
   Disconnect Wallet
========================================== */

export const removeWallet = async () => {

  const response = await API.post("/disconnect");

  return response.data;

};