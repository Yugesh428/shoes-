import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
import authRoute from "./routes/global/auth/authRoute";
import inventoryRoute from "./routes/shop/inventoryRoute";
import orderItemRoute from "./routes/shop/orderItemRoute";
import orderRoute from "./routes/shop/orderRoute";
import reviewRoute from "./routes/shop/reviewRoute";
import addressRoute from "./routes/shop/addressRoute";
import shoeRoute from "./routes/shop/shoeRoute";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/auth", authRoute);
app.use("/api/shop/inventory", inventoryRoute);
app.use("/api/shop/orderItem", orderItemRoute);
app.use("/api/shop/order", orderRoute);
app.use("/api/shop/review", reviewRoute);
app.use("/api/shop/address", addressRoute);
app.use("/api/shop/shoe", shoeRoute);

export default app;
