import { Router } from "express";
import {
  displayUserProfile,
  updateUserProfile,
} from "../controllers/profileController";
import multer from "multer";
import path from "path";

const router = Router();

// Define upload directory for multer
const uploadDir = path.join(__dirname, "../../user_uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer middleware for handling single image upload
const upload = multer({ storage });

// Route to display user profile
router.get("/dashboard", displayUserProfile);

// Route to update user profile
router.put(
  "/:user_id/edit-profile",
  upload.single("profile_picture"),
  updateUserProfile
);

export default router;
