import Transaction from "../models/Transaction.js";

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
                    user: req.user.id,
                    type: "expense"
                }
            },

            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }
            },

            {
                $sort: {
                    total: -1
                }
            }

        ]);

        res.status(200).json({

            success: true,

            data: summary

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getMonthlyAnalytics = async (req, res) => {

    try {

        const analytics = await Transaction.aggregate([

            {
                $match: {
                    user: req.user._id || req.user.id
                }
            },

            {
                $group: {

                    _id: {

                        year: {
                            $year: "$date"
                        },

                        month: {
                            $month: "$date"
                        }

                    },

                    income: {

                        $sum: {

                            $cond: [

                                {
                                    $eq: ["$type", "income"]
                                },

                                "$amount",

                                0

                            ]

                        }

                    },

                    expense: {

                        $sum: {

                            $cond: [

                                {
                                    $eq: ["$type", "expense"]
                                },

                                "$amount",

                                0

                            ]

                        }

                    }

                }

            },

            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }

        ]);

        res.status(200).json({

            success: true,

            data: analytics

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};