import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =====================
// Register User
// =====================

export const registerUser = async (req, res) => {
  try {
      const { name, email, password } = req.body;

      //Check existing user

      const existingUser = await User.findOne({
          email
      });

      if (existingUser) {
          return res.status(400).json({
              success: false,
              message: "User already exists"
          });
      }
      // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);     
 // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================
// Login User
// ===================

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Generate JWT Token

        console.log(process.env.JWT_EXPIRES_IN);
        console.log(typeof process.env.JWT_EXPIRES_IN);
        
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,

            }
        );

        
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};