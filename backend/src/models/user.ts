import pool from "../db";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  is_seller: string;
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
    throw error; // Rethrow the error to be handled by the calling code
  }
};
