import express from "express";

const router = express.Router();

import {
  handleFetchAllPostRoute,
  handleBlogPostGetRoute,
  handleBlogPostCreateRoute,
  handleBlogPostDeleteRoute,
  handleBlogPostPutRoute,
} from "../../controllers/v1";

router.get("/", handleFetchAllPostRoute).post("/", handleBlogPostCreateRoute);
router
  .get("/:id", handleBlogPostGetRoute)
  .put("/:id", handleBlogPostPutRoute)
  .delete("/:id", handleBlogPostDeleteRoute);

export default router;
