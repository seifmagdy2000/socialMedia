const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");

const updateUserInfoService = async (
  userID,
  updateData,
  requesterID,
  requesterPassword
) => {
  try {
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

    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userID,
      { $set: updateData },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteUserService = async (userID, password) => {
  try {
    const user = await userModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    // Delete the user
    const deletedUser = await userModel.findByIdAndDelete(userID);

    if (!deletedUser) {
      throw new Error("Error deleting user");
    }

    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserService = async (id) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = { updateUserInfoService, deleteUserService, getUserService };
