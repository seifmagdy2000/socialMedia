const postModel = require("../server/models/posts.model");

const createPostService = async (body, userId) => {
  try {
    const { description, image, tags } = body;

    if (!userId || !description) {
      throw { status: 400, message: "Empty userId or description" };
    }

    const newPost = new postModel({
      userID: userId,
      description,
      image: image || null,
      tags: tags || [],
    });

    await newPost.save();

    return newPost;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to create new post" };
  }
};

const updatePostService = async (body, userId, postId) => {
  try {
    if (!postId || !userId) {
      throw { status: 400, message: "Invalid userId or postId" };
    }
    const post = await postModel.findById(postId);
    if (String(post.userID) !== String(userId)) {
      throw { status: 401, message: "only post creator can edit the post" };
    }

    const { description, image, tags } = body;

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        description,
        image: image || null,
        tags: tags || [],
      },
      { new: true }
    );

    if (!updatedPost) {
      throw { status: 404, message: "Post not found" };
    }

    return updatedPost;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to update post" };
  }
};
const deletePostService = async (userId, postId) => {
  try {
    if (!postId || !userId) {
      throw { status: 400, message: "Invalid userId or postId" };
    }
    console.log(postId, userId);

    const post = await postModel.findById(postId);
    if (String(post.userID) !== String(userId)) {
      throw { status: 401, message: "only post creator can delete the post" };
    }

    const deletedPost = await postModel.findByIdAndDelete(postId);
    console.log(deletedPost);

    if (!deletedPost) {
      throw { status: 404, message: "Post not found" };
    }

    return deletedPost;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to delete post" };
  }
};
const likePostService = async (userId, postId) => {
  try {
    if (!postId || !userId) {
      throw { status: 400, message: "Invalid userId or postId" };
    }
    const post = await postModel.findById(postId);
    if (!post) {
      throw { status: 404, message: "Post not found" };
    }
    if (post.likes.includes(userId)) {
      throw { status: 400, message: "Post is already liked by the user" };
    }
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { likes: userId } },
      { new: true }
    );

    return updatedPost;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to like post" };
  }
};

const unlikePostService = async (userId, postId) => {
  try {
    if (!postId || !userId) {
      throw { status: 400, message: "Invalid userId or postId" };
    }
    const post = await postModel.findById(postId);
    if (!post) {
      throw { status: 404, message: "Post not found" };
    }
    if (!post.likes.includes(userId)) {
      throw { status: 400, message: "Post is not liked by the user" };
    }
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: userId } },
      { new: true }
    );

    return updatedPost;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to unlike post" };
  }
};

module.exports = {
  createPostService,
  updatePostService,
  deletePostService,
  likePostService,
  unlikePostService,
};
