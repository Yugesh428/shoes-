import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

export default app;
