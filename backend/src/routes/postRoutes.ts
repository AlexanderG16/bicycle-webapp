import { Router } from "express";
import { displayPost, getOnePost, makePost, makePostStub, searchPostByKeyword } from "../controllers/postController";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

//Define upload directory for multer
const uploadDir = path.join(__dirname, "../../user_uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", displayPost);
router.post("/:user_id/create-post", upload.array("images"), makePost);
router.get("/post/:id", getOnePost);
router.get("/search", searchPostByKeyword);

export default router;
