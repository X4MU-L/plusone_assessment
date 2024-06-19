import Joi from "joi";

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  userId: Joi.string().required(),
  imgUrl: Joi.string(),
});

const blogPostUpdateSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
});
const blogPostDeleteSchema = Joi.object({
  postId: Joi.string().required(),
});

export { blogPostSchema, blogPostUpdateSchema, blogPostDeleteSchema };
