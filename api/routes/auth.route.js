import express from "express";
import { google, signOut, signin, signup, adminSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google", google);
router.post("/admin-signin", adminSignIn);
router.get('/signout',signOut);

export default router;