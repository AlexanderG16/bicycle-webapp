import { Router, Request, Response } from "express";
import { getAllTransactions, getAllSellerTransactions, getSellerTotalSales, getSellerTotalTransactions, insertTransaction, insertTransactionOnePost } from "../controllers/transactionController";

const router = Router();

router.post("/order-list", getAllTransactions);
router.post("/order-checkout", insertTransaction);
router.post("/seller-orders-list", getAllSellerTransactions);
router.post("/total-sales", getSellerTotalSales);
router.post("/total-transactions", getSellerTotalTransactions);
router.post("/:post_id/order-checkout", insertTransactionOnePost);

export default router;
