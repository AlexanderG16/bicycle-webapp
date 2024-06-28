import { Request, Response } from 'express';
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken';

import { findUserByUsername } from '../models/user';

export const displayUserProfile = async (req: Request, res: Response) => {
  const token = Cookies.get("token")
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const username = decoded.username;

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
    };

    console.log("username")
    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};