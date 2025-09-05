import express from "express";
import { urlencoded } from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import todoRoute from "./routes/todoRoute.js";
import cors from "cors";
import { homeContent } from "./utils/homeContent.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL
    : "http://localhost:5173",
  credentials: true,
}))

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/", todoRoute);

app.get("/", (req, res) => {
  res.send(homeContent);
});

app.listen(PORT, async () => {
    await connect()
  console.log(`Server started on port ${PORT}`);
});
