import { Router } from "express";
import { displayCartItems, insertCartItem, setItemQty } from "../controllers/cartController";

const router = Router();

router.post("/", displayCartItems);
router.post("/insert-item", insertCartItem);
router.put("/set-qty", setItemQty);

export default router;
