const {
  updateUserInfoService,
  deleteUserService,
  getUserService,
  followUserService,
} = require("../../services/userServices");

// Update user info
const updateUserinfo = async (req, res) => {
  try {
    const user = await updateUserInfoService(
      req.params.id,
      req.body,
      req.userId,
      req.body.requesterPassword
    );

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

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(
      req.params.id,
      req.userId,
      req.body.requesterPassword
    );

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...data } = deletedUser.toObject();
    res.status(200).json({ message: "User deleted successfully", user: data });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get user
const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.params.id);

    const { password, ...data } = user.toObject();
    res.status(200).json({ message: "User found", user: data });
  } catch (error) {
    console.error("Error finding user:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Follow user
const followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    if (targetUserId === req.userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    await followUserService(targetUserId, req.userId);

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Error following user:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { updateUserinfo, deleteUser, getUser, followUser };
