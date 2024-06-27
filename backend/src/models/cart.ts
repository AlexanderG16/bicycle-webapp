import { login } from "../controllers/authController";
import Post from "../models/post";
import pool from "../db";

interface Cart {
    id: number;
    posts: Array<Post>;
    updatedAt: Date;
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