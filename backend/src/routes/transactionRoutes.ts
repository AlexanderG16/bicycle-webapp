import { Router, Request, Response } from "express";
import { getAllTransactions, insertTransaction, insertTransactionOnePost } from "../controllers/transactionController";

const router = Router();

router.get("/order-list", getAllTransactions);
router.post("/order-checkout", insertTransaction);
router.post("/:post_id/order-checkout", insertTransactionOnePost);


export default router;