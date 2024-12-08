const {
  updateUserInfoService,
  deleteUserService,
  getUserService,
} = require("../../services/userServices");

// Update user info
const updateUserinfo = async (req, res) => {
  try {
    const user = await updateUserInfoService(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user,
      message: "User info is updated successfully",
    });
  } catch (error) {
    console.error("Error updating user info:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(
      req.params.id,
      req.body.password
    );
    const { password, ...data } = deletedUser._doc;
    res.status(200).json({ message: "User deleted sucessfully", userId: data });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.params.id);
    const { password, ...data } = user._doc;
    res.status(200).json({ message: "User found ", data });
  } catch (error) {
    console.error("Error finding user info:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { updateUserinfo, deleteUser, getUser };
