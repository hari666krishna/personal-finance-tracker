export const validateTransaction = (req, res, next) => {

    const {
        title,
        amount,
        type,
        category
    } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be greater than 0"
        });
    }

    if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Type must be income or expense"
        });
    }

    if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    next();
};