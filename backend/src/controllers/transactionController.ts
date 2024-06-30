import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserIdByUsername } from "../models/user";
import { getAllOrders } from "../models/transaction";

export const getAllTransactions = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const username = decoded.username;

    const user_id = await getUserIdByUsername(username);
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
