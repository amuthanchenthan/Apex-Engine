import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    saveStages,
    getStages
} from "../controllers/strategyStageController.js";

const router = express.Router();

router.get("/", authMiddleware, getStages);

router.post("/", authMiddleware, saveStages);

export default router;