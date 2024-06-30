import { Router, Request, Response } from "express";
import { displayUserProfile, updateUserProfile } from "../controllers/profileController";

const router = Router();

router.get("/dashboard", displayUserProfile);
router.post("/edit", updateUserProfile);

export default router;