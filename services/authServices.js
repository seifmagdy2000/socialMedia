const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");

const registerUser = async (req) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await newUser.save();
};
const loginUser = async (req) => {
  // Validate input
  if (!req.body.email || !req.body.password) {
    throw new Error("Email and password are required");
  }

  // Find user by email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) throw new Error("Wrong email or password");
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(req.body.password, user.password);

  if (!checkPassword) {
    throw new Error("Wrong email or password");
  }

  // Return user if successful
  return user;
};

module.exports = { registerUser, loginUser };
