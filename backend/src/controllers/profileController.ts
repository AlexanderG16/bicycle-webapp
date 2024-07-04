import { Request, Response } from 'express';
import Cookies from "js-cookie";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import multer from 'multer';

import { findUserByUsername, updateUser, getUserIdByUsername, registerAsSeller } from '../models/user';

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const displayUserProfile = async (req: Request, res: Response) => {
  // Testing Postman:
  const token = req.headers.authorization?.split(' ')[1];
  // Testing Front-End:
  // const token = Cookies.get("token");

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwtDecode(token);
    const username = decoded.username ?? '';

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

// Update user profile including profile picture
export const updateUserProfile = [
  upload.single('profilePicture'),
  async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const username = decoded.username;

      const user = await findUserByUsername(username);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { oldPassword, newPassword, email, phone_number } = req.body;
      const profile_picture = req.file ? req.file.path : undefined;

      if (oldPassword && newPassword) {
        // Verify old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid old password' });
        }

        // Check if the new password is the same as the old password
        const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
        if (isNewPasswordSame) {
          return res.status(400).json({ message: 'New password cannot be the same as the old password' });
        }

        // Update password if old password is valid and new password is different
        user.password = await bcrypt.hash(newPassword, 10);
      }

      // Update other profile fields if provided
      if (email) user.email = email;
      if (phone_number) user.phone_number = phone_number;
      if (profile_picture) user.profile_picture = profile_picture;

      // Update user profile
      await updateUser(user, oldPassword);

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        is_seller: user.is_seller,
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
];

export const registerBuyerToSeller = async (req: Request, res: Response) => {
  // Testing Postman:
  const token = req.headers.authorization?.split(' ')[1];
  // Testing Front-End:
  // const token = Cookies.get("token");

  const phone_number = req.body;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id ?? 0;

    await registerAsSeller(user_id, phone_number);
    return res.status(200).json({ message: "User successfully registered as seller" });
  } catch (error) {
    console.error('Error registering user as seller:', error);
    return res.status(500).json({ message: 'Unexpected Error Occured' });
  }
};