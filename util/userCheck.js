const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");

const userCheck = async (id) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
module.exports = userCheck;
