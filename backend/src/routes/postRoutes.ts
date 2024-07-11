import { Router } from "express";
import { displayPost, getOnePost, makePost, searchPostByKeyword, getImageFromServer, getPostImages } from "../controllers/postController";
import multer from "multer";
import path from "path";

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
router.get("/retrieve_img/:filename", getImageFromServer);
router.post("/retrieve_img_post", getPostImages);

export default router;
