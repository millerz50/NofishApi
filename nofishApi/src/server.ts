import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;
const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to Database");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch((err: unknown) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });
