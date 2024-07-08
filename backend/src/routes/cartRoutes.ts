import { Router } from "express";
import { displayCartItems, insertCartItem, setItemQty } from "../controllers/cartController";

const router = Router();

router.post("/", displayCartItems);
router.post("/insert-item", insertCartItem);
router.put("/set-qty", setItemQty);
// router.put("/increase", incrementItemQty);
// router.put("/decrease", decrementItemQty);

export default router;
