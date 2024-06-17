import { Request, Response } from "express";
import { updateUser, ServerError, deleteUser } from "../../utils";
import {
  editUserSchema,
  deleteUserSchema,
  verifyEmailAvailableSchema,
  verifyUsernameAvailableSchema,
} from "../../types";
import {
  editUserSchema as updateSchema,
  deleteUserSchema as deleteSchema,
  verifyEmailAvailableSchema as verifyEmailSchema,
  verifyUsernameAvailableSchema as verifyUsernameSchema,
} from "../../schema";
import { ValidationError } from "joi";

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

export { handleDeleteUserRoute, handleUpdateUserRoute };
