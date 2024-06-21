import pool from '../db';
import bcrypt from 'bcryptjs';

interface User {
  id?: number;
  name: string; // Assuming the column name in your database is "name"
  password: string;
  email: string;
  phone_number: string;
  address: string;
}

export const findUserByName = async (name: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM users WHERE name = ?', [name]);
    conn.release();

    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user by name:', error);
    conn.release();
    return null;
  }
};

export const createUser = async (name: string, password: string, email: string, phone_number: string, address: string): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const conn = await pool.getConnection();
  try {
    await conn.query('INSERT INTO users (name, password_hashed, email, phone_number, address) VALUES (?, ?, ?, ?, ?)', [name, hashedPassword, email, phone_number, address]);
    conn.release();
  } catch (error) {
    console.error('Error creating user:', error);
    conn.release();
    throw error; // Rethrow the error to be handled by the calling code
  }
};
