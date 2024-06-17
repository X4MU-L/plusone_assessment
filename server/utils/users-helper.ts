import _ from "lodash";

import { MongooseError } from "mongoose";
import {
  User,
  UserType,
  SignInUserType,
  UserTypeWithoutPassword,
} from "../models";
import { editUserSchema, signInUserSchema, signUpUserSchema } from "../types";
import { ServerError } from "./errors";
import { createSignedToken, hashPassword, verifyPassword } from "./utils";

async function signInUser(data: signInUserSchema): Promise<SignInUserType> {
  try {
    const { email, password, username } = data;
    const queryInfo = email ? { email } : { username };
    const user = await User.findOne(queryInfo);
    if (!user) {
      throw new ServerError("User does not exist", 404);
    }
    // verify password
    const match = await verifyPassword(password, user.password);
    if (!match) {
      throw new ServerError("Invalid username password or password", 401);
    }
    const token = createSignedToken({ userId: user._id });
    return { user: _.omit(user, ["password"]), token };
  } catch (error) {
    if (error instanceof MongooseError && error.name === "CastError") {
      throw new ServerError("Post not found", 404);
    }
    throw error;
  }
}

async function createNewUser(data: signUpUserSchema): Promise<SignInUserType> {
  const password = await hashPassword(data.password);
  const updateDetails = { ...data, password };
  const newUser = new User(updateDetails);

  const user = await newUser.save();
  const token = createSignedToken({ userId: user._id });

  const userObject = user.toObject();
  return { user: _.omit(userObject, ["password"]), token };
}

async function updateUser(
  userId: string,
  updatedFields: Omit<editUserSchema, "userId">
): Promise<UserTypeWithoutPassword> {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...updatedFields,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updateUser) {
      throw new ServerError("Post not found", 404);
    }
    const userObject = updatedUser?.toObject();
    return _.omit(userObject, ["password"]);
  } catch (error) {
    if (error instanceof MongooseError && error.name === "CastError") {
      throw new ServerError("Post not found", 404);
    }
    throw error;
  }
}

async function deleteUser(userId: string): Promise<UserTypeWithoutPassword> {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ServerError("Post not found", 404);
  }
  const userObject = deletedUser.toObject();
  return _.omit(userObject, ["password"]);
}

export { signInUser, createNewUser, updateUser, deleteUser };
