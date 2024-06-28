import { Router } from "express";
import { displayPost, getOnePost, makePost, searchPostByKeyword } from "../controllers/postController";
import { displayCartItems } from "../controllers/cartController";

const router = Router();

router.get("/:cart_id", displayCartItems);
// router.post("/:user_id/create-post", makePost);
// router.get("/post/:post_id", getOnePost);
// router.get("/search", searchPostByKeyword);

export default router;
