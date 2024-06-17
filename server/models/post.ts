import { Document, Model, model, Schema } from "mongoose";

export interface PostArgegateDataType {
  total: number;
  data: Array<PostType>;
}
export interface PostType extends Document {
  title: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}

export type PostArgegateResultType = [PostArgegateDataType];

export const postSchema = new Schema<PostType>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post: Model<PostType> = model<PostType>("Post", postSchema);

export default Post;
