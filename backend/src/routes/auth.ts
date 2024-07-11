import { Router } from "express";
import { login, signup, becomeSeller } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/becomeSeller", becomeSeller);

export default router;
