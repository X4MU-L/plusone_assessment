import { MongooseError } from "mongoose";
import { Post, PostArgegateDataType, PostType } from "../models";
import { blogPostSchema, blogPostUpdateSchema } from "../types";
import { ServerError } from "./errors";

async function getSinglePost(postId: string) {
  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      throw new ServerError("Post not found", 404);
    }

    return post;
  } catch (error) {
    if (error instanceof MongooseError) {
      throw new ServerError(error.message, 404);
    }
    throw error;
  }
}

const fetchPaginatedPosts = async (
  page: number,
  limit: number
): Promise<PostArgegateDataType | undefined> => {
  try {
    const posts = await Post.aggregate<PostArgegateDataType>([
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [{ $skip: limit * page - limit }, { $limit: limit }],
        },
      },

      {
        $project: {
          total: { $arrayElemAt: ["$total.count", 0] },
          data: 1,
        },
      },
    ]);

    return posts[0];
  } catch (error) {
    console.log(error);
  }
};

async function createNewPost(data: blogPostSchema) {
  const post = new Post(data);
  console.log(post);
  await post.save();
  console.log("after save", post);
  return post;
}

async function updatePost(
  postId: string,
  updatedFields: Omit<blogPostUpdateSchema, "postId">
): Promise<PostType> {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        ...updatedFields,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!post) {
      throw new ServerError("Post not found", 404);
    }

    return post;
  } catch (error) {
    if (error instanceof MongooseError && error.name === "CastError") {
      throw new ServerError("Post not found", 404);
    }
    throw error;
  }
}

async function deletePost(postId: string): Promise<PostType> {
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
    throw new ServerError("Post not found", 404);
  }
  return post;
}

export {
  fetchPaginatedPosts,
  createNewPost,
  updatePost,
  deletePost,
  getSinglePost,
};
