import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByUsername, createUser } from '../models/user';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token });
};

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  await createUser(username, password);
  res.status(201).json({ message: 'User created successfully' });
};

export { login, register };
