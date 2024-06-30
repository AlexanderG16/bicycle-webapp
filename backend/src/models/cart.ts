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

export const getAllCartItems = async (cart_id: number): Promise<Array<CartItems> | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM cart_item WHERE cart_id = ?", [cart_id]);
    conn.release(); 

    return rows as Array<CartItems>;
  } catch (error) {
    console.error("Error getting all cart items:", error);
    conn.release();
    return null;
  }
};

export const insertItemToCart = async (cart_id?: number, post_id?: number, quantity?: number): Promise<void> => {
  const conn = await pool.getConnection();
  try {
    await conn.query("INSERT INTO cart_item (cart_id, post_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?", [cart_id, post_id, quantity, quantity]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured ", error);
    conn.release();
    throw error;
  }
}

export const incrementItem = async (cart_id?: number, post_id?: number): Promise<void> => {
  const conn = await pool.getConnection();
  try {
    await conn.query("UPDATE cart_item SET quantity = quantity + 1 WHERE cart_id = ? AND post_id = ?", [cart_id, post_id]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured ", error);
    conn.release();
    throw error;
  }
}

export const decrementItem = async (cart_id?: number, post_id?: number): Promise<void> => {
  const conn = await pool.getConnection();
  try {
    await conn.query("UPDATE cart_item SET quantity = IF(quantity = 1, quantity, quantity - 1) WHERE cart_id = ? AND post_id = ?", [cart_id, post_id]); // TODO: Tambahin message kalau decrement nya udah < 1
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured: ", error);
    conn.release();
    throw error;
  }
}

export const setItemQuantity = async (cart_id?: number, post_id?: number, quantity?: number): Promise<void> => {
  const conn = await pool.getConnection();
  try {
    await conn.query("UPDATE cart_item SET quantity = ? WHERE cart_id = ? AND post_id = ?", [quantity, cart_id, post_id]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured: ", error);
    conn.release();
    throw error;
  }
}