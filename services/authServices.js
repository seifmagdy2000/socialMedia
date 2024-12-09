const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../server/models/user.model");

const registerUser = async (req) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
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
    throw new Error("invalid inputs");
  }

  // Create JWT
  return (token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  ));
};

module.exports = { registerUser, loginUser };
