const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
//register

const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const { password, ...data } = newUser._doc;
    await newUser.save();
    res.status(200).json({
      newUser,
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
