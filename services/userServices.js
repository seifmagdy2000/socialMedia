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

    if (!updatedUser) {
      throw { status: 404, message: "User not found" };
    }

    return updatedUser;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to update user information" };
  }
};

// Delete User
const deleteUserService = async (userID, requesterID, requesterPassword) => {
  try {
    await authorizeAction(userID, requesterID, requesterPassword);

    const deletedUser = await userModel.findByIdAndDelete(userID);

    if (!deletedUser) {
      throw { status: 404, message: "User not found" };
    }

    return deletedUser;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to delete user" };
  }
};

// Get User
const getUserService = async (id) => {
  try {
    const user = await userCheck(id);

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    return user;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to fetch user information" };
  }
};

// Follow User
const followUserService = async (targetUserId, requesterId) => {
  try {
    const targetUser = await userModel.findById(targetUserId);
    const requester = await userModel.findById(requesterId);

    if (!targetUser || !requester) {
      throw { status: 404, message: "User(s) not found" };
    }

    await targetUser.updateOne({ $addToSet: { followers: requesterId } });
    await requester.updateOne({ $addToSet: { following: targetUserId } });

    return { message: "Follow operation was successful" };
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to follow user" };
  }
};

// Unfollow User
const unfollowUserService = async (targetUserId, requesterId) => {
  try {
    const targetUser = await userModel.findById(targetUserId);
    const requester = await userModel.findById(requesterId);

    if (!targetUser || !requester) {
      throw { status: 404, message: "User(s) not found" };
    }

    await targetUser.updateOne({ $pull: { followers: requesterId } });
    await requester.updateOne({ $pull: { following: targetUserId } });

    return { message: "Unfollow operation was successful" };
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to unfollow user" };
  }
};

module.exports = {
  updateUserInfoService,
  deleteUserService,
  getUserService,
  followUserService,
  unfollowUserService,
};
