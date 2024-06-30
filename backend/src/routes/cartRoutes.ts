import { Router } from "express";
import { decrementItemQty, displayCartItems, incrementItemQty, insertCartItem } from "../controllers/cartController";

const router = Router();

router.get("/:cart_id", displayCartItems);
router.post("/:cart_id/insert-item", insertCartItem);
router.put("/:cart_id/increase", incrementItemQty);
router.put("/:cart_id/decrease", decrementItemQty);

export default router;
