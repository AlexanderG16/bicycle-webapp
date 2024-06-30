import pool from "../db";
import { RowDataPacket } from "mysql2/promise";

export enum TransactionStatus {
  SUCCESS = "success",
  FAIL = "fail",
}

<<<<<<< HEAD
export class Transaction {
    public transaction_id: number;
    public transaction_date: string;
    public status: TransactionStatus;
    public user_id: number;
    public post_id: number;
    public quantity: number;

    constructor(
        transaction_id: number,
        transaction_date: string,
        status: TransactionStatus,
        user_id: number,
        post_id: number,
        quantity: number
    ) {
        this.transaction_id = transaction_id;
        this.transaction_date = transaction_date;
        this.status = status;
        this.user_id = user_id;
        this.post_id = post_id;
        this.quantity = quantity;
    }
}

export interface TransactionRow extends RowDataPacket {
=======
export interface Transaction {
  transaction_id: number;
  transaction_date: string;
  status: TransactionStatus;
  user_id: number;
  post_id: number;
  quantity: number;
}

interface TransactionRow extends RowDataPacket {
>>>>>>> f0b0df1a78df1bb61f5f7f78e8169cd5699bf22c
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
<<<<<<< HEAD
};

export const createTransaction = async (transaction_date: string, status: TransactionStatus, user_id: number, post_id: number, quantity: number) => {    
    const conn = await pool.getConnection();
    try {
         await conn.query("INSERT INTO transaction (transaction_date, status, user_id) VALUES (?, ?, ?)", [transaction_date, status, user_id])
         conn.release();
    } catch (error) {
        console.error("Unexpected Error Occured");
        conn.release();
        throw error;    
    }
}
=======
};
>>>>>>> f0b0df1a78df1bb61f5f7f78e8169cd5699bf22c
