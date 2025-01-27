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
  product_name: string;
}

export const getAllOrders = async (user_id: number): Promise<Transaction[] | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query(
      `SELECT 
          t.id AS transaction_id,
          t.transaction_date,
          t.status,
          t.user_id,
          td.post_id,
          td.quantity,
          td.total_price,
          p.title AS product_name
        FROM \`transaction\` t
        JOIN \`transaction_detail\` td ON t.id = td.transaction_id
        JOIN \`post\` p ON td.post_id = p.id
        WHERE t.user_id = ?
        ORDER BY t.transaction_date DESC;`,
      [user_id]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    // Map rows to Transaction objects
    const transactions: Transaction[] = rows.map((row: any) => ({
      transaction_id: row.transaction_id,
      transaction_date: row.transaction_date,
      status: row.status as TransactionStatus,
      user_id: row.user_id,
      post_id: row.post_id,
      quantity: row.quantity,
      total_price: row.total_price,
      product_name: row.product_name,
    }));

    return transactions;
  } catch (error) {
    console.error("Error getting all transactions with product details:", error);
    return null;
  } finally {
    conn.release();
  }
};

// ini create transaction yg bukan dari cart
export const createTransactionOnePost = async (status: TransactionStatus, user_id: number, post_id: number, quantity: number): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.beginTransaction();

    const post = (await getPostByID(post_id)) as Post;
    if (post) {
      console.log("Item's price: ", post.price);
      console.log("Qty: ", quantity);

      const [result] = (await conn.query("INSERT INTO `transaction` (status, user_id, total_price) VALUES (?, ?, ?)", [status, user_id, post.price * quantity])) as [ResultSetHeader, any];

      const insertedId = result.insertId;
      await conn.query("INSERT INTO `transaction_detail` (transaction_id, post_id, quantity, total_price) VALUES (?, ?, ?, ?)", [insertedId, post_id, quantity, post.price * quantity]);

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

export const createTransaction = async (user_id: string, transaction_date: Date, status: TransactionStatus, total_price: number): Promise<number> => {
  const conn = await InitDB.getInstance();
  try {
    const [result] = await conn.query("INSERT INTO transaction (user_id, transaction_date, status, total_price) VALUES (?, ?, ?, ?)", [user_id, transaction_date, status, total_price]);
    conn.release();
    return (result as any).insertId;
  } catch (error) {
    console.error("Unexpected Error Occured");
    conn.release();
    throw error;
  }
};

export const createTransactionDetail = async (transaction_id: number, post_id: number, quantity: number, total_price: number): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query("INSERT INTO transaction_detail (transaction_id, post_id, quantity, total_price) VALUES (?, ?, ?, ?)", [transaction_id, post_id, quantity, total_price]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured");
    conn.release();
    throw error;
  }
};

export const getAllOrdersBySeller = async (seller_id: number): Promise<Transaction[] | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query(
      `SELECT 
          t.id AS transaction_id,
          t.transaction_date,
          t.status,
          td.post_id,
          td.quantity,
          td.total_price,
          p.title AS product_name,
          p.price AS product_price
        FROM \`transaction\` t
        JOIN \`transaction_detail\` td ON t.id = td.transaction_id
        JOIN \`post\` p ON td.post_id = p.id
        JOIN (
            SELECT 
                td.post_id,
                SUM(td.quantity) AS total_quantity
            FROM \`transaction_detail\` td
            JOIN \`post\` p ON td.post_id = p.id
            WHERE p.user_id = ?
            GROUP BY td.post_id
            ORDER BY total_quantity DESC
        ) pq ON pq.post_id = p.id
        WHERE p.user_id = ?
        ORDER BY pq.total_quantity DESC, t.transaction_date DESC;`,
      [seller_id, seller_id]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    // Map rows to Transaction objects
    const transactions: Transaction[] = rows.map((row: any) => ({
      transaction_id: row.transaction_id,
      transaction_date: row.transaction_date,
      status: row.status as TransactionStatus,
      post_id: row.post_id,
      quantity: row.quantity,
      total_price: row.total_price,
      product_name: row.product_name,
      product_price: row.product_price,
    }));

    return transactions;
  } catch (error) {
    console.error("Error getting all transactions for seller:", error);
    return null;
  } finally {
    conn.release();
  }
};

export const getTotalSalesBySeller = async (seller_id: number): Promise<number | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query(
      `SELECT 
          SUM(td.total_price) AS total_sales
        FROM \`transaction\` t
        JOIN \`transaction_detail\` td ON t.id = td.transaction_id
        JOIN \`post\` p ON td.post_id = p.id
        WHERE p.user_id = ?;`,
      [seller_id]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const totalSales = rows[0].total_sales;
    return totalSales || 0;
  } catch (error) {
    console.error("Error getting total sales for seller:", error);
    return null;
  } finally {
    conn.release();
  }
};

export const getTotalOrdersBySeller = async (seller_id: number): Promise<number | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query(
      `SELECT 
          SUM(td.quantity) AS total_pieces_sold
        FROM \`transaction\` t
        JOIN \`transaction_detail\` td ON t.id = td.transaction_id
        JOIN \`post\` p ON td.post_id = p.id
        WHERE p.user_id = ?;`,
      [seller_id]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const totalPiecesSold = rows[0].total_pieces_sold;
    return totalPiecesSold || 0;
  } catch (error) {
    console.error("Error getting total pieces sold for seller:", error);
    return null;
  } finally {
    conn.release();
  }
};
