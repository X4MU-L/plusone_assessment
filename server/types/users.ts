/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface deleteUserSchema {
  email?: string;
  userId: string;
  username?: string;
}

export interface editUserSchema {
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface signInUserSchema {
  email?: string;
  password: string;
  username?: string;
}

export interface signUpUserSchema {
  email: string;
  firstName: string;
  imgUrl?: string;
  lastName: string;
  password: string;
  username: string;
}

export interface verifyEmailAvailableSchema {
  email: string;
}

export interface verifyUsernameAvailableSchema {
  username: string;
}
