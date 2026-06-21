import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {

    try {

        const {
            title,
            amount,
            type,
            category,
            description,
            date,
        } = req.body;

        const transaction = await Transaction.create({

            user: req.user.id,

            title,

            amount,

            type,

            category,

            description,

            date,

        });

        res.status(201).json({

            success: true,

            message: "Transaction Added Successfully",

            data: transaction,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const getTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateTransaction = async (req, res) => {

    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Transaction Updated Successfully",
            data: updatedTransaction,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const deleteTransaction = async (req, res) => {

    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Transaction Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const filterTransactions = async (req, res) => {

    try {

        const { type, category } = req.query;

        let filter = {
            user: req.user.id
        };

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        const transactions = await Transaction.find(filter);

        res.status(200).json({

            success: true,

            count: transactions.length,

            data: transactions,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
