const Joi = require("joi");

const userValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean().optional(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const PostValidation = Joi.object({
  description: Joi.string().min(1).max(500).required(),
  image: Joi.string().uri().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = {
  userValidation,
  loginValidation,
  PostValidation,
};
