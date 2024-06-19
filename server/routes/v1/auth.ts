import express from "express";

const router = express.Router();

import {
  handleSignUpUserRoute,
  handleSignInRoute,
  handleVerifyRoute,
} from "../../controllers/v1";

router.post("/login", handleSignInRoute);
router.post("/signup", handleSignUpUserRoute);
router.get("/verify", handleVerifyRoute);

export default router;
