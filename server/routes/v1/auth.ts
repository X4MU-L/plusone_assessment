import express from "express";

const router = express.Router();

import { handleSignUpUserRoute, handleSignInRoute } from "../../controllers/v1";

router.post("/login", handleSignInRoute);
router.post("/signup", handleSignUpUserRoute);

export default router;
