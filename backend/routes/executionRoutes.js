import express from "express";

import {

    saveExecution,

    getExecutions,
    getLatestBuy,

} from "../controllers/executionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveExecution);

router.get("/", authMiddleware, getExecutions);

export default router;
router.get(
    "/latest-buy/:strategyId",
    authMiddleware,
    getLatestBuy
);