const {
  createPostService,
  updatePostService,
  deletePostService,
  likePostService,
  unlikePostService,
  getPostService,
  getTimelinePostsService,
} = require("../../services/postServices");
const { PostValidation } = require("../../util/validation");

const createPost = async (req, res) => {
  try {
    const { error } = PostValidation.validate(req.body);
    if (error) {
      throw { status: 400, message: error.details[0].message };
    }
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
    const { error } = PostValidation.validate(req.body);
    if (error) {
      throw { status: 400, message: error.details[0].message };
    }
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
const deletePost = async (req, res) => {
  try {
    const post = await deletePostService(req.userId, req.params.Id);

    res.status(200).json({
      message: "Post was deleted successfully",
      post: post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Post deleting error",
      error: error.stack || error,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await likePostService(req.userId, req.params.Id);

    res.status(200).json({
      message: "post was successfully liked",
      post: post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "error couldnt like the post",
      error: error.stack || error,
    });
  }
};
const unlikePost = async (req, res) => {
  try {
    const post = await unlikePostService(req.userId, req.params.Id);

    res.status(200).json({
      message: "post was successfully unliked",
      post: post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "error couldnt unlike the post",
      error: error.stack || error,
    });
  }
};
const getPost = async (req, res) => {
  try {
    const post = await getPostService(req.params.Id);

    res.status(200).json({
      message: "post was fetched successfully",
      post: post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "error couldnt fetch the post",
      error: error.stack || error,
    });
  }
};
const getTimelinePosts = async (req, res) => {
  try {
    const { page = 0, pageSize = 10 } = req.query;
    const posts = await getTimelinePostsService(
      req.userId,
      parseInt(page),
      parseInt(pageSize)
    );

    res.status(200).json({
      message: "Timeline posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Error fetching timeline posts",
    });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getPost,
  getTimelinePosts,
};
