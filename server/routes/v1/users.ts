import express from "express";

const router = express.Router();

import {
  handleDeleteUserRoute,
  handleUpdateUserRoute,
} from "../../controllers/v1";

router.put("/:id", handleUpdateUserRoute).delete("/:id", handleDeleteUserRoute);

export default router;
