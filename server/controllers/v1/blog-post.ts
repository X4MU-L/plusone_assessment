import { Request, Response } from "express";
import {
  fetchPaginatedPosts,
  createNewPost,
  updatePost,
  ServerError,
  deletePost,
} from "../../utils";
import {
  blogPostSchema,
  blogPostUpdateSchema,
  blogPostDeleteSchema,
} from "../../types";
import {
  blogPostSchema as postSchema,
  blogPostUpdateSchema as updateSchema,
  blogPostDeleteSchema as deleteSchema,
} from "../../schema";
import { ValidationError } from "joi";

// handle get request for the blog-post route
async function handleBlogPostGetRoute(req: Request, res: Response) {
  const page = req.query.page ? +req.query.page : 1;
  const limit = req.query.limit ? +req.query.limit : 10;

  try {
    if (page < 1 || limit < 1) {
      throw new ServerError(
        "page and limit query parameters must be greater than 0",
        400
      );
    }
    const posts = await fetchPaginatedPosts(page, limit);
    res.status(200).send({
      posts: posts?.data,
      totalPost: posts?.total,
      success: true,
      message: "posts fetched successfully",
    });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "internal server error",
        status: "error",
        statusCode: 500,
      });
    }
  }
}

// handle create blog post request for the blog-post route
async function handleBlogPostCreateRoute(
  req: Request<{}, {}, blogPostSchema>,
  res: Response
) {
  try {
    try {
      await postSchema.validateAsync(req.body);
    } catch (error: unknown) {
      throw new ServerError((error as ValidationError).message, 400);
    }
    // create a new blog post
    const post = await createNewPost(req.body);
    res
      .status(201)
      .send({ post, success: true, message: "blog post created successfully" });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "internal server error",
        status: "error",
        statusCode: 500,
      });
    }
  }
}

// handle update blog post request for the blog-post route
async function handleBlogPostPutRoute(
  req: Request<{}, {}, blogPostUpdateSchema>,
  res: Response
) {
  try {
    try {
      await updateSchema.validateAsync(req.body);
    } catch (error: unknown) {
      throw new ServerError((error as ValidationError).message, 400);
    }
    // create a new blog post
    const updatedPost = await updatePost(req.body.postId, req.body);
    res.status(200).send({
      success: true,
      message: "blog post updated successfully",
      postId: updatedPost._id,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "internal server error",
        status: "error",
        statusCode: 500,
      });
    }
  }
}

// handle delete blog post request for the blog-post route
async function handleBlogPostDeleteRoute(
  req: Request<{}, {}, blogPostDeleteSchema>,
  res: Response
) {
  try {
    try {
      await deleteSchema.validateAsync(req.body);
    } catch (error: unknown) {
      throw new ServerError((error as ValidationError).message, 400);
    }
    // delete a blog post
    const deletedPost = await deletePost(req.body.postId);
    console.log(deletedPost);
    res.status(200).send({
      success: true,
      message: "blog post deleted successfully",
    });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "internal server error",
        status: "error",
        statusCode: 500,
      });
    }
  }
}

export {
  handleBlogPostGetRoute,
  handleBlogPostCreateRoute,
  handleBlogPostDeleteRoute,
  handleBlogPostPutRoute,
};
