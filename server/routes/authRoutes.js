import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../validators/authValidator.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  registerUser
);

// ==============
// Login Route
// ==============

router.post(
    "/login",
    validateLogin,
    loginUser
);
// ==========================
// Protecteed Profile Route
// ===========================
router.get("/profile", protect, (req, res) => {

    res.status(200).json({

        success: true,

        message: "Protected Route Accessed Successfully",

        user: req.user

    });

});


export default router;