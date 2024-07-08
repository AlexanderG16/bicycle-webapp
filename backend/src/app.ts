import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import postRoutes from "./routes/postRoutes";
import cartRoutes from "./routes/cartRoutes";
import profileRoutes from "./routes/profileRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// Routes

//Auth Endpoints (login and register)
app.use("/api/auth", authRoutes);

//Post Endpoints (upload post)
app.use("/", postRoutes);

//Cart Endpoints (list cart Items)
app.use("/cart", cartRoutes);

//Profile Endpoints (profile dashboard)
app.use("/profile", profileRoutes);

//Transaction Endpoints (list all orders)
app.use("/transaction", transactionRoutes);

// endpoint buat retrieve image
app.use("/user_uploads", postRoutes);

export default app;
