const authenticate = require("../../middleware/authMiddleware");
const { createPostService } = require("../../services/postServices");

const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body, req.userId);

    res.status(201).json({
      message: "Post was created successfully",
      post: post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Post creation error",
      error: error.stack || error,
    });
  }
};

module.exports = { createPost };
