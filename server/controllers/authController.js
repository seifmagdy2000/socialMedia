const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  }
};

//login
const login = async (req, res) => {
  try {
    const token = await loginUser(req, res);
    res.status(200).json({ message: "logged in successfully", token });
  } catch (error) {
    throw new Error();
  }
};

module.exports = { register, login };
