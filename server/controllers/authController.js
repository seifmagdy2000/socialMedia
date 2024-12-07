const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { registerUser, loginUser } = require("../../services/authServices");

//registation
const register = async (req, res) => {
  try {
    await registerUser(req);
    res.status(200).json({
      message: "created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "registration error",
    });
    console.log(error);
  }
};

//login
const login = async (req, res) => {
  try {
    const user = await loginUser(req);
    const { password, ...data } = user._doc;
    res.status(200).json({
      message: "Logged in successfully",
      data,
    });
    console.log(data);
  } catch (error) {
    console.error("Login error:", error.message);

    if (error.message === "Email and password are required") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "Wrong email or password") {
      return res.status(401).json({ message: error.message });
    }

    // Generic server error
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
