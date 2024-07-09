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

// app.get('/api/image/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const directoryPath = path.join(__dirname, 'user_uploads');
//   const filePath = path.join(directoryPath, filename);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(404).send('File not found');
//     }
//   });
// });

export default router;
