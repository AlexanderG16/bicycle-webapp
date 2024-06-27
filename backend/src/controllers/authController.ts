import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByUsername, createUser } from "../models/user";
import { createCart } from "../models/cart";

import { getAllPosts, createPost, getPostByID } from "../models/post";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      role: user.is_seller,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  await createCart(user.id);
  
  res.json({ token });
};

const signup = async (req: Request, res: Response) => {
  const { username, password, email, phoneNumber } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "name already taken" });
    }
    await createUser(username, password, email, phoneNumber);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 3 function dibawah ini nanti harus dipisah buat 


export { login, signup };