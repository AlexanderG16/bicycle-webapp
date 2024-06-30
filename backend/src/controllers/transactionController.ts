import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../db";
import { getUserIdByUsername } from "../models/user";
import { jwtDecode } from "jwt-decode";
import { createTransactionOnePost, getAllOrders, TransactionStatus } from "../models/transaction";
import { getAllCartItems } from "../models/cart";

export const getAllTransactions = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwtDecode(token);
    console.log(decoded.user_id)
    const user_id = decoded.user_id ?? '';

    if (!user_id) {
      return res.status(404).json({ message: "User not found" });
    }

    const transactions = await getAllOrders(user_id);
    if (!transactions) {
      return res.status(404).json({ message: "No transactions found" });
    }
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const insertTransactionOnePost = async (req: Request, res: Response) => {
  const token = req. headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user_id = decoded.user_id;

    if (!user_id) {
      return res.status(404).json({ message: "User not found" });
    }
    const quantity = req.body.quantity;

    const getIdFromPath = (path: string, idIndex: number) => {
      const pathSegments = path.split("/");
      const idString = pathSegments[pathSegments.length - idIndex]; // Assuming id is the last segment
      return Number(idString); // Convert the extracted id to a number
    };

    const post_id = getIdFromPath(req.path, 2);
    await createTransactionOnePost(TransactionStatus.SUCCESS, user_id, post_id, quantity);
    console.log("pepek 2");
    return res.status(200).json({ message: "Transaction has been succesfully created"});
  } catch (error) {
    console.error("Unexpected Error Occured:", error)
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

}

export const insertTransaction = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user_id = decoded.user_id;

      if (!user_id) {
          return res.status(404).json({ message: "User not found" });
      }

      // Retrieve cart items
      const cartItems = await getAllCartItems(user_id);
      if (!cartItems || cartItems.length === 0) {
          return res.status(404).json({ message: "No cart items found" });
      }

      // Start a transaction
      const conn = await pool.getConnection();
      await conn.beginTransaction();

      try {
          // Insert into the transaction table
          const [transactionResult] = await conn.query(
              "INSERT INTO transaction (user_id, transaction_date, status) VALUES (?, NOW(), ?)",
              [user_id, TransactionStatus.SUCCESS]
          );
          const transaction_id = (transactionResult as any).insertId;

          // Insert into the transaction_detail table
          for (const item of cartItems) {
              await conn.query(
                  "INSERT INTO transaction_detail (transaction_id, post_id, quantity) VALUES (?, ?, ?)",
                  [transaction_id, item.post_id, item.quantity]
              );
          }

          // Commit the transaction
          await conn.commit();
          conn.release();

          return res.status(201).json({ message: "Transaction created successfully", transaction_id });

      } catch (error) {
          // Rollback the transaction in case of error
          await conn.rollback();
          conn.release();
          console.error("Error creating transaction:", error);
          return res.status(500).json({ message: "Internal server error" });
      }

  } catch (error) {
      console.error("Error creating transaction:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};