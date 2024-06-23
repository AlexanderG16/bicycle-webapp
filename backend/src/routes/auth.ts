import { Router } from "express";
import { displayPost, login, signup } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/home", displayPost);

export default router;
