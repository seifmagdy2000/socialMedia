const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    description: {
      type: String,
      maxlength: 500, // Maximum length for the description
    },
    image: {
      type: String,
    },
    likes: {
      type: [String], // Array of user IDs
      default: [],
    },
    comments: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
          maxlength: 300,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
