import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pool from './db'; // Import the database connection

import authRoutes from './routes/auth';
import postRoutes from './routes/postRoutes';
import profileRoutes from './routes/profileRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Database initialization
async function initDB() {
  try {
    await pool.getConnection(); // Test the database connection
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
  }
}
initDB(); // Initialize the database connection

// Routes
app.use('/api/auth', authRoutes);
app.use('/', postRoutes)
app.use('/profile', profileRoutes)

export default app;