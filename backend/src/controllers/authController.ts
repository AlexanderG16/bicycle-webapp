import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByName, createUser } from '../models/user';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await findUserByName(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.name }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token });
};

const register = async (req: Request, res: Response) => {
  const { username, password, email, phone_number, address } = req.body;

  try {
    const existingUser = await findUserByName(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    await createUser(username, password, email, phone_number, address);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { login, register };
