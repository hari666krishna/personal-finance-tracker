import express from "express";

import {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
} from "../controllers/transactionController.js";

import { protect } from "../middleware/authMiddleware.js";

import { validateTransaction } from "../validators/transactionValidator.js";

const router = express.Router();

router.post(
    "/",
    protect,
    validateTransaction,
    addTransaction
);

router.get("/", protect, getTransactions);

router.put("/:id", protect, updateTransaction);

router.delete("/:id", protect, deleteTransaction);

router.get("/filter", protect, filterTransactions);

export default router;