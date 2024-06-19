import { Request, Response } from "express";
import {
  updateUser,
  ServerError,
  deleteUser,
  verifyUserAvailable,
} from "../../utils";
import { editUserSchema } from "../../types";
import {
  editUserSchema as updateSchema,
  verifyEmailAvailableSchema as verifyEmailSchema,
} from "../../schema";
import { ValidationError } from "joi";

async function handleVerifyRoute(
  req: Request<{ email?: string; username?: string }, {}>,
  res: Response
) {
  const { email, username } = req.query;
  try {
    if (!email && !username) {
      throw new ServerError("email or username is required", 400);
    }

    if (email) {
      try {
        await verifyEmailSchema.validateAsync({ email });
      } catch (error: unknown) {
        throw new ServerError((error as ValidationError).message, 400);
      }
      // check if email is available
      const emailAvailable = await verifyUserAvailable({
        email: email as string,
        username: "",
      });
      res.status(200).send({
        success: true,
        message: "email is available",
        emailAvailable,
      });
    } else if (username) {
      // check if username is available
      const usernameAvailable = await verifyUserAvailable({
        email: "",
        username: username as string,
      });
      res.status(200).send({
        success: true,
        message: "username is available",
        usernameAvailable,
      });
    } else {
      throw new ServerError("email or username is required", 400);
    }
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
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
// handle update user put request for the user route
async function handleUpdateUserRoute(
  req: Request<{ id: string }, {}, editUserSchema>,
  res: Response
) {
  const userId = req.params.id;

  try {
    try {
      await updateSchema.validateAsync(req.body);
    } catch (error: unknown) {
      throw new ServerError((error as ValidationError).message, 400);
    }
    // update a user information
    const updatetedUser = await updateUser(userId, req.body);
    res.status(200).send({
      success: true,
      message: "blog post updated successfully",
      user: updatetedUser,
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

// handle delete user delete request for the user route
async function handleDeleteUserRoute(
  req: Request<{ id: string }, {}, {}>,
  res: Response
) {
  const userId = req.params.id;
  try {
    // try {
    //   await deleteSchema.validateAsync(req.body);
    // } catch (error: unknown) {
    //   throw new ServerError((error as ValidationError).message, 400);
    // }
    // delete a blog post
    const deletedUser = await deleteUser(userId);

    res.status(200).send({
      success: true,
      message: "blog post deleted successfully",
      userId: deletedUser._id,
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

export { handleDeleteUserRoute, handleUpdateUserRoute, handleVerifyRoute };
