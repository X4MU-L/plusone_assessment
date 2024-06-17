import Joi from "joi";

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const blogPostUpdateSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  postId: Joi.string().required(),
});
const blogPostDeleteSchema = Joi.object({
  postId: Joi.string().required(),
});

export { blogPostSchema, blogPostUpdateSchema, blogPostDeleteSchema };
