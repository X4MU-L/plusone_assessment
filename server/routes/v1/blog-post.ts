import express from "express";

const router = express.Router();

import {
  handleBlogPostGetRoute,
  handleBlogPostCreateRoute,
  handleBlogPostDeleteRoute,
  handleBlogPostPutRoute,
} from "../../controllers/v1";

router
  .get("/", handleBlogPostGetRoute)
  .post("/", handleBlogPostCreateRoute)
  .put("/", handleBlogPostPutRoute)
  .delete("/", handleBlogPostDeleteRoute);

export default router;
