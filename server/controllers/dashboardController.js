import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getDashboardSummary = async (req, res) => {

    try {

        const transactions = await Transaction.find({
            user: req.user.id
        });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {

            if (transaction.type === "income") {

                totalIncome += transaction.amount;

            } else {

                totalExpense += transaction.amount;

            }

        });

        const balance = totalIncome - totalExpense;

        res.status(200).json({

            success: true,

            summary: {

                totalIncome,

                totalExpense,

                balance,

                totalTransactions: transactions.length,

            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const getRecentTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find({

            user: req.user.id,

        })
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json({

            success: true,

            data: transactions,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const getCategorySummary = async (req, res) => {

    try {

        const summary = await Transaction.aggregate([

            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                    type: "expense",
                },
            },

            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },

            {
                $sort: {
                    total: -1,
                },
            },

        ]);

        res.status(200).json({

            success: true,

            data: summary,

        });

    } catch (error) {
        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const getMonthlyAnalytics = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      user: req.user.id,
    });

    const monthlyMap = {};

    transactions.forEach((transaction) => {

      const date = new Date(transaction.date);

      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          month,
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === "income") {
        monthlyMap[month].income += transaction.amount;
      } else {
        monthlyMap[month].expense += transaction.amount;
      }

    });

    const analytics = Object.values(monthlyMap);

    console.log("Analytics:", analytics);

    res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};