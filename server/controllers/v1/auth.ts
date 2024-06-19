import { Request, Response } from "express";
import { signInUser, createNewUser, ServerError } from "../../utils";
import { signInUserSchema, signUpUserSchema } from "../../types";
import {
  signInUserSchema as signInSchema,
  signUpUserSchema as signUpSchema,
} from "../../schema";
import { ValidationError } from "joi";
import { MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";

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
    res.status(201).send({
      token,
      user,
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else if (
      error?.constructor.name === "MongoServerError" ||
      error instanceof MongoServerError ||
      error instanceof MongooseError
    ) {
      const err = error as MongoServerError;

      res.status(401).send({
        success: false,
        message: err.message.includes("duplicate key")
          ? "username or email already exists"
          : err.message,
        status: "error",
        statusCode: 401,
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
