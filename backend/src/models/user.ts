import InitDB from "../database";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { RowDataPacket } from "mysql2/promise";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  address?: string;
  profile_picture?: string;
  is_seller: number;
}

interface UserRow extends RowDataPacket {
  id: number;
}

export const findUserById = async (user_id: number): Promise<User | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [user_id]);
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

export const findUserByUsername = async (name: string): Promise<User | null> => {
  const conn = await InitDB.getInstance();
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
  const conn = await InitDB.getInstance();
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
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query("SELECT id FROM `users` WHERE username = ?", [username]);

    if (rows.length > 0) {
      console.log(`User ID for username ${username}:`, rows[0].id);
      return rows[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error getting user ID by username:", error);
    return null;
  } finally {
    conn.release();
  }
};

export const updateUser = async (user: User, oldPassword: string, newName: string, newPhone: string, newPassword: string, newEmail: string, newAddress: string, newPP: string): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    // Fetch the current password from the database
    const [rows]: any = await conn.query("SELECT password FROM users WHERE id = ?", [user.id]);
    const currentPassword = rows[0]?.password;

    if (!currentPassword) {
      throw new Error("User not found");
    }

    // Compare old password with the current password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, currentPassword);
    if (!isOldPasswordValid) {
      throw new Error("Invalid old password");
    }

    // Check if the new password is the same as the old password
    const isNewPasswordSame = await bcrypt.compare(user.password, currentPassword);
    if (isNewPasswordSame) {
      throw new Error("New password cannot be the same as the old password");
    }

    // Hash newPassword
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user in the database
    if (user.is_seller === 1) {
      await conn.query("UPDATE users SET password = ?, email = ?, phone_number = ?, address = ?, profile_picture = ? WHERE id = ?", [hashedPassword, newEmail, newPhone, newAddress, newPP, user.id]);
    } else {
      await conn.query("UPDATE users SET password = ?, email = ?, address = ?, profile_picture = ? WHERE id = ?", [hashedPassword, newEmail, newAddress, newPP, user.id]);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  } finally {
    conn.release();
  }
};

export const registerAsSeller = async (user_id: number, phone_number: string): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query("UPDATE users SET phone_number = ? WHERE id = ?", [phone_number, user_id]);
  } catch (error) {
    console.error("Error registering as seller:", error);
    throw error;
  } finally {
    conn.release();
  }
};

export const findIsSeller = async (user_id: number): Promise<boolean> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query("SELECT is_seller FROM `users` WHERE id = ?", [user_id]);

    if (rows.length > 0) {
      return rows[0].is_seller === 1;
    }
    return false;
  } catch (error) {
    console.error("Error checking if user is a seller:", error);
    return false;
  } finally {
    conn.release();
  }
};
