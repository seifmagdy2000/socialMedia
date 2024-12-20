const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../server/models/user.model");

const registerUser = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  });
  await newUser.save();
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw { status: 401, message: "unauthorized" };
  }

  const accessToken = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  //  Refresh Tokens
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw { status: 401, message: "Refresh token missing" };
  }

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    throw { status: 403, message: "Invalid refresh token" };
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Issue a new Access Token
    const accessToken = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { accessToken };
  } catch (error) {
    throw { status: 403, message: "Invalid or expired refresh token" };
  }
};

const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw { status: 400, message: "Refresh token required" };
  }

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    throw { status: 400, message: "Invalid token" };
  }
  user.refreshToken = null;
  await user.save();
};
module.exports = { registerUser, loginUser, handleRefreshToken, logoutUser };
