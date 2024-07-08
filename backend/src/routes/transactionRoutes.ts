import { Router, Request, Response } from "express";
import {
  getAllTransactions,
  getAllSellerTransactions,
  getSellerTotalSales,
  getSellerTotalTransactions,
  insertTransaction,
  insertTransactionOnePost,
} from "../controllers/transactionController";

const router = Router();

router.post("/order-list", getAllTransactions);
router.post("/order-checkout", insertTransaction);
router.post("/seller-orders-list", getAllSellerTransactions);
router.post("/total-sales", getSellerTotalSales);
router.post("/total-transactions", getSellerTotalTransactions);

export default router;
