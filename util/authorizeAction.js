const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");
const userCheck = require("./userCheck");
userCheck;

const authorizeAction = async (userID, requesterID, requesterPassword) => {
  const user = await userCheck(userID);
  const requester = await userCheck(requesterID);

  if (!user || !requester) {
    throw new Error("User not found");
  }

  const isAuthorized =
    requester.isAdmin ||
    (await bcrypt.compare(requesterPassword, user.password));

  if (!isAuthorized) {
    throw new Error("Unauthorized: Invalid password or not an admin");
  }

  return user;
};
module.exports = authorizeAction;
