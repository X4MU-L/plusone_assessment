import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ServerError } from "./errors";

const SALTROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALTROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password: hashPassword", error);
    throw new ServerError("An error occured", 500);
  }
}

function createSignedToken(data: string | object): string {
  try {
    const token = jwt.sign(data, process.env.APP_SECRET!);
    return token;
  } catch (error) {
    console.log("Error creating signed token: createSignedToken", error);
    throw new ServerError("An error occured", 500);
  }
}
async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log("Error verifying password: verifyPassword", error);
    throw new ServerError("Failed to verify password", 500);
  }
}

export { hashPassword, verifyPassword, createSignedToken };
