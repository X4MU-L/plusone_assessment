import { MongooseError } from "mongoose";
import _ from "lodash";
import { Post, PostArgegateDataType, PostType, User } from "../models";
import { blogPostSchema, blogPostUpdateSchema } from "../types";
import { ServerError } from "./errors";
import { createTags } from "./tag-helper";

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
          data: [
            { $skip: limit * page - limit },
            { $limit: limit },
            {
              $lookup: {
                from: "users", // The name of the User collection
                localField: "author", // The field in the Post document to join on
                foreignField: "_id", // The field in the User document to join on
                as: "author", // The field to add the joined documents to
              },
            },
            {
              $unwind: "$author", // Unwind the array of joined documents to a single document
            },
            {
              $lookup: {
                from: "tags", // The name of the Tags collection
                localField: "tags", // The field in the Post document to join on
                foreignField: "_id", // The field in the Tags document to join on
                as: "tags", // The field to add the joined documents to
              },
            },
            {
              $project: {
                title: 1,
                content: 1,
                tags: 1,
                createdAt: 1,
                updatedAt: 1,
                "author.firstName": 1,
                "author.lastName": 1,
                "author._id": 1,
                "author.imgUrl": 1,
              },
            },
          ],
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
  let tagIds: string[] = [];
  if (data.tags) {
    tagIds = await createTags(data.tags);
  }
  try {
    await User.findOne({ _id: data.userId });
  } catch (error) {
    throw new ServerError("no user exists for userId", 404);
  }

  const post = new Post({
    ..._.omit(data, ["userId"]),
    author: data.userId,
    tags: tagIds,
  });
  await post.save();
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
