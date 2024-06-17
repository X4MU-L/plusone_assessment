import express from "express";

const router = express.Router();

import {
  handleBlogPostGetRoute,
  handleBlogPostFetchRoute,
  handleBlogPostDeleteRoute,
  handleBlogPostPutRoute,
} from "../../controllers/v1";

router
  .get("/", handleBlogPostGetRoute)
  .post("/", handleBlogPostFetchRoute)
  .put("/", handleBlogPostPutRoute)
  .delete("/", handleBlogPostDeleteRoute);

export default router;
