export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  // Name Validation
  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  // Email Validation
  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  // Password Validation
  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};
// =========================
// Login Validation
// =========================
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required",
        });
    }

    next();
}