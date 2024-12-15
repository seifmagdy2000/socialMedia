const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createPost);

router.put("/update/:Id", authenticate, updatePost);

router.delete("/delete/:Id", authenticate, deletePost);

module.exports = router;
