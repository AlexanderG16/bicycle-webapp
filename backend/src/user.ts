import pool from '../src/db';
import bcrypt from 'bcryptjs';

interface User {
  id?: number;
  username: string;
  password: string;
}

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  const rows = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
  conn.release();

  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

export const createUser = async (username: string, password: string): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const conn = await pool.getConnection();
  await conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  conn.release();
};
