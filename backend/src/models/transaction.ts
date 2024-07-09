import InitDB from "../database";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import Post, { getPostByID } from "./post";

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

export const getAllOrders = async (
  user_id: number
): Promise<Array<Transaction> | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = (await conn.query(
      `SELECT t.id AS transaction_id, t.transaction_date, t.status, t.user_id, td.post_id, td.quantity, td.total_price
        FROM \`transaction\` t
        JOIN \`transaction_detail\` td ON t.id = td.transaction_id
        WHERE t.user_id = ?
        ORDER BY t.transaction_date DESC;`,
      [user_id]
    )) as [TransactionRow[], any];
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Error getting all transactions:", error);
    return null;
  } finally {
    conn.release();
  }
};

// ini create transaction yg bukan dari cart
export const createTransactionOnePost = async (
  status: TransactionStatus,
  user_id: number,
  post_id: number,
  quantity: number
): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.beginTransaction();

    const post = (await getPostByID(post_id)) as Post;
    if (post) {
      console.log("Item's price: ", post.price);
      console.log("Qty: ", quantity);

      const [result] = (await conn.query(
        "INSERT INTO `transaction` (status, user_id, total_price) VALUES (?, ?, ?)",
        [status, user_id, post.price * quantity]
      )) as [ResultSetHeader, any];

      const insertedId = result.insertId;
      await conn.query(
        "INSERT INTO `transaction_detail` (transaction_id, post_id, quantity, total_price) VALUES (?, ?, ?, ?)",
        [insertedId, post_id, quantity, post.price * quantity]
      );

      await conn.commit();
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    await conn.rollback();
    console.error("Unexpected Error Occured:", error);
    throw error;
  } finally {
    conn.release();
  }
};

export const createTransaction = async (
  user_id: string,
  transaction_date: Date,
  status: TransactionStatus,
  total_price: number
): Promise<number> => {
  const conn = await InitDB.getInstance();
  try {
    const [result] = await conn.query(
      "INSERT INTO transaction (user_id, transaction_date, status, total_price) VALUES (?, ?, ?, ?)",
      [user_id, transaction_date, status, total_price]
    );
    conn.release();
    return (result as any).insertId;
  } catch (error) {
    console.error("Unexpected Error Occured");
    conn.release();
    throw error;
  }
};

export const createTransactionDetail = async (
  transaction_id: number,
  post_id: number,
  quantity: number,
  total_price: number
): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query(
      "INSERT INTO transaction_detail (transaction_id, post_id, quantity, total_price) VALUES (?, ?, ?, ?)",
      [transaction_id, post_id, quantity, total_price]
    );
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured");
    conn.release();
    throw error;
  }
};