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

module.exports = { registerUser };
