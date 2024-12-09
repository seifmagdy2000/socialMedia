const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");

const authorizeAction = async (userID, requesterID, requesterPassword) => {
  const user = await userModel.findById(userID);
  const requester = await userModel.findById(requesterID);

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
