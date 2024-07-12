import { Router } from "express";
import { login, signup, becomeSeller, logout } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/becomeSeller", becomeSeller);
router.post("/logout", logout);

export default router;
