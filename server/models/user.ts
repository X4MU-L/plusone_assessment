import { Document, Model, model, Schema } from "mongoose";

export interface UserType extends Document {
  firstName: string;
  lastName: string;
  fullName: string | null;
  email: string;
  imgUrl: string | null;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

export type UserTypeWithoutPassword = Omit<UserType, "password">;

export interface SignInUserType {
  token: string;
  user: UserTypeWithoutPassword;
}

export const userSchema = new Schema<UserType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  imgUrl: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User: Model<UserType> = model<UserType>("User", userSchema);

export default User;
