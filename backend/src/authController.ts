import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByName, createUser } from '../src/models/user';

const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = await findUserByName(name);
  if (!user) {
    return res.status(401).json({ message: 'Invalid name or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid name or password' });
  }

  const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token });
};

const register = async (req: Request, res: Response) => {
  const { name, password, email, phone_number, address } = req.body;

  try {
    const existingUser = await findUserByName(name);
    if (existingUser) {
      return res.status(400).json({ message: 'name already taken' });
    }
    await createUser(name, password, email, phone_number, address);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { login, register };
