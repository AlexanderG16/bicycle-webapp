import { Request, Response } from "express";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import multer from "multer";

import { findUserByUsername, findUserById, updateUser, registerAsSeller } from "../models/user";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const displayUserProfile = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;

  try {
    const user = await findUserById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      profile_picture: user.profile_picture,
    };

    console.log("username: ", user.username);
    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;

  try {
    const user = await findUserById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { oldPassword, newPassword, email, phone_number, address } = req.body;
    console.log(req.file);
    const profile_picture = req.file;

    if (oldPassword && newPassword) {
      // Verify old password
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid old password" });
      }

      // Check if the new password is the same as the old password
      const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
      if (isNewPasswordSame) {
        return res.status(400).json({
          message: "New password cannot be the same as the old password",
        });
      }

      // Update password if old password is valid and new password is different
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update other profile fields if provided
    if (email) user.email = email;
    if (phone_number) user.phone_number = phone_number;

    // Update user profile
    await updateUser(user, oldPassword, user.username, user.phone_number, newPassword, user.email, address, profile_picture?.filename ?? "");

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      is_seller: user.is_seller,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerBuyerToSeller = async (req: Request, res: Response) => {
  // Testing Postman:
  const user_id = req.body.user_id;
  // Testing Front-End:
  // const token = Cookies.get("token");
  const phone_number = req.body;

  try {
    if (!user_id) {
      return res.status(404).json({ message: "User not found" });
    }

    await registerAsSeller(user_id, phone_number);
    return res.status(200).json({ message: "User successfully registered as seller" });
  } catch (error) {
    console.error("Error registering user as seller:", error);
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
};
