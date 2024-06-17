import { Request, Response } from "express";
import { signInUser, createNewUser, ServerError } from "../../utils";
import { signInUserSchema, signUpUserSchema } from "../../types";
import {
  signInUserSchema as signInSchema,
  signUpUserSchema as signUpSchema,
} from "../../schema";
import { ValidationError } from "joi";
import { MongooseError } from "mongoose";

// handle get request for the blog-post route
async function handleSignInRoute(
  req: Request<{}, {}, signInUserSchema>,
  res: Response
) {
  try {
    try {
      await signInSchema.validateAsync(req.body);
    } catch (error: unknown) {
      throw new ServerError((error as ValidationError).message, 400);
    }
    // sign user in
    const { token, user } = await signInUser(req.body);
    res
      .status(201)
      .send({ user, token, success: true, message: "successfully signed in" });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    }
  }
}

// handle create blog post request for the blog-post route
async function handleSignUpUserRoute(
  req: Request<{}, {}, signUpUserSchema>,
  res: Response
) {
  try {
    try {
      await signUpSchema.validateAsync(req.body);
    } catch (error: unknown) {
      throw new ServerError((error as ValidationError).message, 400);
    }
    // create a new user
    const { token, user } = await createNewUser(req.body);
    console.log(user, "request");
    res.status(201).send({
      token,
      user,
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else if (error instanceof MongooseError) {
      res.status(400).send({
        success: false,
        message: error.message,
        status: "error",
        statusCode: 400,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "internal server error",
        status: "error",
        statusCode: 500,
      });
    }
  }
}

export { handleSignInRoute, handleSignUpUserRoute };
