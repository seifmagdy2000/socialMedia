const bcrypt = require("bcrypt");
const userModel = require("../server/models/user.model");

const updateUserInfoService = async (userID, updateData) => {
  if (updateData.password) {
    try {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }
  try {
    const user = await userModel.findByIdAndUpdate(
      userID,
      { $set: updateData },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error("Error updating user info");
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
