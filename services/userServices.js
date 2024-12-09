const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");
const authorizeAction = require("../util/authorizeAction");
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
      throw new Error("Error deleting user");
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
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Unable to fetch user information.");
  }
};

module.exports = { updateUserInfoService, deleteUserService, getUserService };
