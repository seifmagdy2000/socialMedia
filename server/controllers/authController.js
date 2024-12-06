const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { registerUser } = require("../../services/authServices");

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

module.exports = { register };
