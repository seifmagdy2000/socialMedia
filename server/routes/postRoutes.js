const express = require("express");
const { createPost, updatePost } = require("../controllers/postController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createPost);

router.put("/update/:Id", authenticate, updatePost);

module.exports = router;
