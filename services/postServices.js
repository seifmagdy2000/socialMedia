const postModel = require("../server/models/posts.model");

const createPostService = async (body, userId) => {
  try {
    const { description, image, tags } = body;

    console.log(userId, description);

    if (!userId || !description) {
      throw { status: 400, message: "Empty userId or description" };
    }

    const newPost = new postModel({
      userID: userId,
      description,
      image: image || null,
      tags: tags || [],
    });

    console.log(newPost);

    await newPost.save();

    return newPost;
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Failed to create new post" };
  }
};

module.exports = { createPostService };
