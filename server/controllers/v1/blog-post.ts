import { Request, Response } from "express";
import { fetchPaginatedPosts } from "../../utils";

// handle get request for the blog-post route
async function handleBlogPostFetchRoute(req: Request, res: Response) {
  const page = req.query.page ? +req.query.page : 1;
  const limit = req.query.limit ? +req.query.limit : 10;

  const posts = await fetchPaginatedPosts(page, limit);
  res
    .status(200)
    .send({ posts, success: true, message: "posts fetched successfully" });
}

// handle post request for the blog-post route
async function handleBlogPostGetRoute(req: Request, res: Response) {
  res.status(200).send({ success: true, message: "blog post get route" });
}

async function handleBlogPostPutRoute(req: Request, res: Response) {
  res
    .status(200)
    .send({ success: true, message: "blog post updated successfully" });
}

async function handleBlogPostDeleteRoute(req: Request, res: Response) {
  res
    .status(200)
    .send({ success: true, message: "blog post deleted successfully" });
}

export {
  handleBlogPostGetRoute,
  handleBlogPostFetchRoute,
  handleBlogPostDeleteRoute,
  handleBlogPostPutRoute,
};
