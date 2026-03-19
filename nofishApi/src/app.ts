import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes";
import { apiLimiter } from "./middleware/limiter";

dotenv.config();

const app: Application = express();

// Security Middlewares
app.use(helmet()); // Sets various HTTP headers
app.use(cors());
app.use(express.json());

// Apply Rate Limiter to all API routes
app.use("/api", apiLimiter);

// Routing
app.use("/api/users", userRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
