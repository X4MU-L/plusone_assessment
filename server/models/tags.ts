import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface TagType extends Document {
  name: string;
  createdAt: Date;
}

const tagSchema = new Schema<TagType>({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Tag: Model<TagType> = model<TagType>("Tag", tagSchema);

export default Tag;
