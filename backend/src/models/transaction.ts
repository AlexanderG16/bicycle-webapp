import pool from "../db";
import { RowDataPacket } from "mysql2/promise";

export enum TransactionStatus {
  SUCCESS = "success",
  FAIL = "fail",
}

export interface Transaction {
  transaction_id: number;
  transaction_date: string;
  status: TransactionStatus;
  user_id: number;
  post_id: number;
  quantity: number;
}

interface TransactionRow extends RowDataPacket {
  transaction_id: number;
  transaction_date: string;
  status: TransactionStatus;
  user_id: number;
  post_id: number;
  quantity: number;
}

export const getAllOrders = async (user_id: number): Promise<Array<Transaction> | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<TransactionRow[]>(
      `SELECT t.id AS transaction_id, t.transaction_date, t.status, t.user_id, td.post_id, td.quantity
       FROM \`transaction\` t
       JOIN \`transaction_detail\` td ON t.id = td.transaction_id
       WHERE t.user_id = ?
       ORDER BY t.transaction_date DESC;`,
      [user_id]
    );
    conn.release();

    console.log(`Transactions for user ID ${user_id}:`, rows);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Error getting all transactions:", error);
    conn.release();
    return null;
  }
};