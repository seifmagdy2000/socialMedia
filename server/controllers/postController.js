const authenticate = require("../../middleware/authMiddleware");
const {
  createPostService,
  updatePostService,
} = require("../../services/postServices");

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

const updatePost = async (req, res) => {
  try {
    console.log(req.userId, req.params.Id);

    const post = await updatePostService(req.body, req.userId, req.params.Id);

    res.status(200).json({
      message: "Post was updated successfully",
      post: post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Post updating error",
      error: error.stack || error,
    });
  }
};

module.exports = { createPost, updatePost };
