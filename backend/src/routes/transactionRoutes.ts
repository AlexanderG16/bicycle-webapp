import { Router, Request, Response } from "express";
import { getAllTransactions } from "../controllers/transactionController";

const router = Router();

router.get("/order-list", getAllTransactions);

export default router;