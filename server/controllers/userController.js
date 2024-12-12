const {
  updateUserInfoService,
  deleteUserService,
  getUserService,
  followUserService,
  unfollowUserService,
} = require("../../services/userServices");
const { handleError } = require("../../util/errorHandler");

// Update User Info
const updateUserinfo = async (req, res) => {
  try {
    const user = await updateUserInfoService(
      req.params.id,
      req.body,
      req.userId,
      req.body.requesterPassword
    );

    res.status(200).json({ user, message: "User info updated successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(
      req.params.id,
      req.userId,
      req.body.requesterPassword
    );

    const { password, ...data } = deletedUser.toObject();
    res.status(200).json({ message: "User deleted successfully", user: data });
  } catch (error) {
    handleError(res, error);
  }
};

// Get User
const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.params.id);

    const { password, ...data } = user.toObject();
    res.status(200).json({ message: "User found", user: data });
  } catch (error) {
    handleError(res, error);
  }
};

// Follow User
const followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    if (targetUserId === req.userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const result = await followUserService(targetUserId, req.userId);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

// Unfollow User
const unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    if (targetUserId === req.userId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const result = await unfollowUserService(targetUserId, req.userId);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  updateUserinfo,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};
