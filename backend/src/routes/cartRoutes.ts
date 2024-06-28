import { Router } from "express";
import { displayPost, getOnePost, makePost, searchPostByKeyword } from "../controllers/postController";

const router = Router();

router.get("/", displayCartItem);
router.post("/:user_id/create-post", makePost);
router.get("/post/:id", getOnePost);
router.get("/search", searchPostByKeyword);

export default router;
