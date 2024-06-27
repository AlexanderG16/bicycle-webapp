import { Router } from "express";
import { displayPost, getOnePost, makePost } from "../controllers/postController";

const router = Router();

router.get("/", displayPost);
router.post("/:user_id/create-post", makePost);
router.get("/post/:id", getOnePost);

export default router;
