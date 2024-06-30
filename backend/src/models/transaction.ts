import pool from "../db";
import { RowDataPacket } from "mysql2/promise";
import Post, { getPostByID } from "./post";
import { ResultSetHeader } from 'mysql2/promise';

export enum TransactionStatus {
  SUCCESS = "success",
  FAIL = "fail",
}

export interface Transaction {
  transaction_id: number;
  transaction_date: string;
  status?: TransactionStatus;
  user_id?: number;
  post_id?: number;
  quantity?: number;
  total_price?: number;
}

interface TransactionRow extends RowDataPacket {
  transaction_id: number;
  transaction_date: string;
  status?: TransactionStatus;
  user_id?: number;
  post_id?: number;
  quantity?: number;
  total_price?: number;
}

export const getAllOrders = async (user_id: number): Promise<Array<Transaction> | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<TransactionRow[]>(
      `SELECT t.id AS transaction_id, t.transaction_date, t.status, t.user_id, td.post_id, td.quantity, td.total_price
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

// ini create transaction yg bukan dari cart
export const createTransactionOnePost = async (status: TransactionStatus, user_id: number, post_id: number, quantity: number) => {    
    const conn = await pool.getConnection();
    try {
        const post = await getPostByID(post_id) as Post;
        var insertedId = 0;
        if (post != undefined) {

          console.log("Item's price: ", post.price);
          console.log("Qty: ", quantity);

          const [result] = await conn.query<ResultSetHeader>("INSERT INTO transaction (status, user_id, total_price) VALUES (?, ?, ?)", [status, user_id, post.price * quantity]);

          // Return the ID of the inserted record
          insertedId = result.insertId;
        } else {
            throw console.error("Post not found");
        }
        await conn.query("INSERT INTO transaction_detail (transaction_id, post_id, quantity, total_price) VALUES (?, ?, ?, ?)", [insertedId, post_id, quantity, post.price * quantity]);
        conn.release();
    } catch (error) {
        console.error("Unexpected Error Occured");
        conn.release();
        throw error;    
    }
}

export const createTransaction = async (user_id: string, transaction_date: Date, status: TransactionStatus): Promise<number> => {
  const conn = await pool.getConnection();
  try {
      const [result] = await conn.query(
          "INSERT INTO transaction (user_id, transaction_date, status) VALUES (?, ?, ?)",
          [user_id, transaction_date, status]
      );
      conn.release();
      return (result as any).insertId;
  } catch (error) {
      console.error("Unexpected Error Occured");
      conn.release();
      throw error;
  }
};

export const createTransactionDetail = async (transaction_id: number, post_id: number, quantity: number): Promise<void> => {
  const conn = await pool.getConnection();
  try {
      await conn.query(
          "INSERT INTO transaction_detail (transaction_id, post_id, quantity) VALUES (?, ?, ?)",
          [transaction_id, post_id, quantity]
      );
      conn.release();
  } catch (error) {
      console.error("Unexpected Error Occured");
      conn.release();
      throw error;
  }
};