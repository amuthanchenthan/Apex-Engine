import express from "express";

import {
  connectWallet,
  disconnectWallet,
  getWallet,
} from "../controllers/walletController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   Get Current Wallet
========================================== */

router.get(
  "/me",
  authMiddleware,
  getWallet
);

/* ==========================================
   Connect Wallet
========================================== */

router.post(
  "/connect",
  authMiddleware,
  connectWallet
);

/* ==========================================
   Disconnect Wallet
========================================== */

router.post(
  "/disconnect",
  authMiddleware,
  disconnectWallet
);

export default router;