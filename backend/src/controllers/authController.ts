import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByUsername, createUser, registerAsSeller, findUserById } from "../models/user";
import { createCart, getCartByUserId } from "../models/cart";
import Cookies from "js-cookie";

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

    const user = await findUserById(user_id);
    const cart = await getCartByUserId(user_id);
    if (user !== null) {
      if (cart !== null) {
        const token = jwt.sign(
          {
            user_id: user_id,
            username: user.username,
            role: user.is_seller,
            cart_id: cart.id,
          },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );
        return res.status(201).json({
          message: "Succesfully registered as seller",
          token,
        });
      } else {
        return res.status(404).json({
          message: "There is no cart with that ID",
        });
      }
    } else {
      return res.status(404).json({
        message: "User with that ID doesn't exists",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log("ERROR LOG OUT: ", error);
    return res.status(500).json({
      message: "Unexpected error occurred.",
    });
  }
};

export { login, logout, signup, becomeSeller };
