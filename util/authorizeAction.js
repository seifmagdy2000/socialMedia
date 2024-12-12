const bcrypt = require("bcrypt");
const userCheck = require("./userCheck");
userCheck;

const authorizeAction = async (userID, requesterID, requesterPassword) => {
  const user = await userCheck(userID);
  const requester = await userCheck(requesterID);
  console.log(user, requester);

  if (!user || !requester) {
    throw new Error("User not found");
  }

  const isAuthorized =
    requester.isAdmin ||
    (await bcrypt.compare(requesterPassword, user.password));
  console.log(isAuthorized);

  if (!isAuthorized) {
    if (!isAuthorized) {
      throw {
        status: 401,
        message: "user is not authorized",
      };
    }
  }

  return user;
};
module.exports = authorizeAction;
