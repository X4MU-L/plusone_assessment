import { Document, Model, model, Schema, Types } from "mongoose";

export interface PostArgegateDataType {
  total: number;
  data: Array<PostType>;
}
export interface PostType extends Document {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  author: Types.ObjectId;
  imgUrl: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export type PostArgegateResultType = [PostArgegateDataType];

export const postSchema = new Schema<PostType>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  imgUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post: Model<PostType> = model<PostType>("Post", postSchema);

export default Post;
