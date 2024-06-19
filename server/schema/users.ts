import { verify } from "crypto";
import Joi from "joi";

const signInUserSchema = Joi.object()
  .keys({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(200).required(),
  })
  .xor("username", "email");

const signUpUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  imgUrl: Joi.string(),
  password: Joi.string().required(),
});

const editUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  username: Joi.string(),
});

const deleteUserSchema = Joi.object()
  .keys({
    username: Joi.string(),
    email: Joi.string().email(),
    userId: Joi.string().required(),
  })
  .xor("username", "email", "userId");

const verifyUsernameAvailableSchema = Joi.object({
  username: Joi.string().required(),
});
const verifyEmailAvailableSchema = Joi.object({
  email: Joi.string().email().required(),
});

export {
  signInUserSchema,
  signUpUserSchema,
  editUserSchema,
  deleteUserSchema,
  verifyUsernameAvailableSchema,
  verifyEmailAvailableSchema,
};
