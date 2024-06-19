import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface UserType {
  firstName: string;
  lastName: string;
  fullName: string | null;
  email: string;
  username: string;
  imgUrl: string | null;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface SignInUserType {
  token: string;
  user: UserType;
}
export interface AuthState {
  current_user: SignInUserType | null;
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: AuthState = {
  current_user: null,
  isLoading: true,
  isLoaded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, { payload }: PayloadAction<AuthState>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { getCurrentUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
