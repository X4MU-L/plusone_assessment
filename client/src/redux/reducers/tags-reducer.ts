import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface TagType {
  name: string;
  _id: string;
  createdAt: Date;
}
export type TagState = { tags: TagType[] };

const initialState: TagState = {
  tags: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    getTags: (state, { payload }: PayloadAction<TagType[]>) => ({
      ...state,
      tags: payload,
    }),
  },
});

export const { getTags } = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags.tags;

export default tagsSlice.reducer;
