import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByUsername, createUser, registerAsSeller } from "../models/user";
import { createCart, getCartByUserId } from "../models/cart";

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
  let cart = await getCartByUserId(user?.id);

  if (!cart) {
    const newCart = await createCart(user?.id);

    cart = await getCartByUserId(user?.id);
  }

  const token = jwt.sign(
    {
      user_id: user.id,
      username: user.username,
      role: user.is_seller,
      cart_id: cart?.id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return res.json({ token });
};

const signup = async (req: Request, res: Response) => {
  const { username, password, email, phoneNumber } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "name already taken" });
    }
    await createUser(username, password, email, phoneNumber);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const becomeSeller = async (req: Request, res: Response) => {
  const { address, user_id } = req.body;

  try {
    await registerAsSeller(user_id, address);
    return res.status(201).json({
      message: "Succesfully registered as seller",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { login, signup, becomeSeller };
