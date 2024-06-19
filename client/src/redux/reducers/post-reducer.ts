import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserType } from "./auth-reducer";
import { TagType } from "./tags-reducer";

export interface PostType {
  title: string;
  content: string;
  imgUrl: string | null;
  tags: TagType[];
  author: UserType;
  updatedAt: string;
  createdAt: string;
}
export type PostState = { posts: PostType[]; totalPost: number | null };
const initialState: PostState = {
  posts: [],
  totalPost: null,
};

export const tagsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, { payload }: PayloadAction<PostState>) => ({
      ...state,
      posts: payload.posts,
      totalPost: payload.totalPost,
    }),
  },
});

export const { getPosts } = tagsSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default tagsSlice.reducer;
