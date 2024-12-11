const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");
const authorizeAction = require("../util/authorizeAction");
const userCheck = require("../util/userCheck");
// Update User Info
const updateUserInfoService = async (
  userID,
  updateData,
  requesterID,
  requesterPassword
) => {
  try {
    await authorizeAction(userID, requesterID, requesterPassword);

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userID,
      { $set: updateData },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating user info:", error.message);
    throw new Error("Unable to update user information.");
  }
};

// Delete User
const deleteUserService = async (userID, requesterID, requesterPassword) => {
  try {
    await authorizeAction(userID, requesterID, requesterPassword);

    const deletedUser = await userModel.findByIdAndDelete(userID);
    if (!deletedUser) {
      throw new Error("user not found");
    }
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw new Error("Unable to delete user.");
  }
};

// Get User
const getUserService = async (id) => {
  try {
    const user = await userCheck(id);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Unable to fetch user information.");
  }
};
//Follow user
const followUserService = async (userID, requesterID, requesterPassword) => {
  try {
    await authorizeAction(userID, requesterID, requesterPassword);
    const followingUser = await userCheck(requesterID);
    await followingUser.updateOne({ $push: { followers: req.body.userID } });
    return user;
  } catch (error) {
    console.error("Error following user:", error.message);
    throw new Error("Unable to follow user.");
  }
};
module.exports = {
  updateUserInfoService,
  deleteUserService,
  getUserService,
  followUserService,
};
