import pool from "../db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2/promise";

interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  is_seller: string;
}

interface UserRow extends RowDataPacket {
  id: number;
}

export const findUserByUsername = async (name: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM users WHERE username = ?", [name]);
    conn.release();

    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding user by name:", error);
    conn.release();
    return null;
  }
};

export const createUser = async (username: string, password: string, email: string, phone_number: string): Promise<void> => {
  console.log("username: ", username);
  console.log("password: ", password);
  console.log("email: ", email);
  console.log("phoneNumber: ", phone_number);

  const hashedPassword = await bcrypt.hash(password, 10);
  const conn = await pool.getConnection();
  try {
    await conn.query("INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)", [username, hashedPassword, email, phone_number]);
    conn.release();
  } catch (error) {
    console.error("Error creating user:", error);
    conn.release();
    throw error;
  }
};

export const getUserIdByUsername = async (username: string): Promise<number | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<UserRow[]>(
      "SELECT id FROM `users` WHERE username = ?",
      [username]
    );
    conn.release();

    if (rows.length > 0) {
      console.log(`User ID for username ${username}:`, rows[0].id);
      return rows[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error getting user ID by username:", error);
    conn.release();
    return null;
  }
};