import express from "express";

import {
    getDashboardSummary,
    getRecentTransactions,
    getCategorySummary,
    getMonthlyAnalytics
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getDashboardSummary);

router.get("/recent", protect, getRecentTransactions);

router.get("/categories", protect, getCategorySummary);

router.get("/monthly", protect, getMonthlyAnalytics);

export default router;