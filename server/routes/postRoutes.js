const express = require("express");
const { createPost } = require("../controllers/postController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createPost);

module.exports = router;
