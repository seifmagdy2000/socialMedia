const express = require("express");
const {
  updateUserinfo,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  logout,
} = require("../controllers/userController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.put("/update/:id", authenticate, updateUserinfo);

router.delete("/delete/:id", authenticate, deleteUser);

router.get("/get/:id", getUser);

router.put("/follow/:id", authenticate, followUser);

router.put("/unfollow/:id", authenticate, unfollowUser);

module.exports = router;
