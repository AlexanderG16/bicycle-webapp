import { Router, Request, Response } from "express";
import { displayUserProfile } from "../controllers/profileController";

const router = Router();

router.get("/dashboard", displayUserProfile);

export default router;