import { login } from "../controllers/authController";
import Post from "../models/post";
import pool from "../db";

export interface Cart {
    id: number;
    posts: Array<Post>;
    updatedAt: Date;
}

export interface CartItems {
    cart_id: number;
    post_id: number;
    quantity: number;
    addedAt: Date;
}

export const createCart = async (user_id?: number): Promise<void> => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "INSERT INTO cart (user_id) VALUES (?)",
        [user_id]
      );
    } finally {
      connection.release();
    }
}

export const getAllCartItems = async (cart_id?: number): Promise<Array<CartItems> | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM cart_item WHERE cart_id = ?", [cart_id]);
    conn.release(); 

    return rows as Array<CartItems>
  } catch (error) {
    console.error("Error getting all cart items");
    conn.release();
    return null;
  }
}