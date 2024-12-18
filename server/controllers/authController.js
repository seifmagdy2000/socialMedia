const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { registerUser, loginUser } = require("../../services/authServices");
const { userValidation, loginValidation } = require("../../util/validation");

//registation
const register = async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      throw { status: 400, message: error.details[0].message };
    }
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
    const { error } = loginValidation.validate(req.body);
    if (error) {
      throw { status: 400, message: error.details[0].message };
    }
    const token = await loginUser(req, res);
    res.status(200).json({ message: "logged in successfully", token });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "error logging in",
      error: error.stack || error,
    });
  }
};

module.exports = { register, login };
