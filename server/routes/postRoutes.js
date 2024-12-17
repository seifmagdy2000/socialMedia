const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getPost,
  getTimelinePosts,
} = require("../controllers/postController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createPost);

router.put("/update/:Id", authenticate, updatePost);

router.delete("/delete/:Id", authenticate, deletePost);

router.put("/like/:Id", authenticate, likePost);

router.put("/unlike/:Id", authenticate, unlikePost);

router.get("/get/:Id", getPost);

router.get("/timeline/", authenticate, getTimelinePosts);

module.exports = router;
