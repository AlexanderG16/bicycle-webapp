import { Router } from "express";
import { displayPost, getOnePost, login, makePost, signup } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
// 3 Route ini nanti dipisah jadi posts.ts
router.get("/home", displayPost);
router.post("/:user_id/create-post", makePost);
router.get("/post/:id", getOnePost);

export default router;
