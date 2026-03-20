import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import charactersRoutes from "./routes/character-routes.js";

dotenv.config();

const app = express();

app.use(express.json());


app.use("/characters", charactersRoutes);

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();