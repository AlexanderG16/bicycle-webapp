import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import InitDB from "../database";
import { jwtDecode } from "jwt-decode";
import { createTransaction, createTransactionOnePost, getAllOrders, TransactionStatus, createTransactionDetail } from "../models/transaction";
import { getAllCartItems } from "../models/cart";

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const user_id = req.body;

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
  try {
    const user_id = req.body;

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
    return res.status(200).json({ message: "Transaction has been successfully created" });
  } catch (error) {
    console.error("Unexpected Error Occurred:", error);
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
};

export const insertTransaction = async (req: Request, res: Response) => {
  try {
    const {user_id, cart_id} = req.body;
    // Retrieve cart items
    const cartItems = await getAllCartItems(cart_id);
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found" });
    }

    const transaction_date = new Date();

    // Start a transaction
    const conn = await InitDB.getInstance();
    await conn.beginTransaction();

    try {
      // Insert into the transaction table and get the transaction_id
      const transaction_id = await createTransaction(
        user_id,
        transaction_date,
        TransactionStatus.SUCCESS
      );

      // Insert into the transaction_detail table
      for (const item of cartItems) {
        await createTransactionDetail(
          transaction_id,
          item.post.id,
          item.quantity
        );
      }

      // Commit the transaction
      await conn.commit();

      return res
        .status(201)
        .json({ message: "Transaction created successfully", transaction_id });
    } catch (error) {
      // Rollback the transaction in case of error
      await conn.rollback();
      console.error("Error creating transaction:", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};