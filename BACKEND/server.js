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

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'https://fullstack-todoapp-gyay.onrender.com', // Backend URL
  'https://fullstack-todo-frontend-hwje.onrender.com', // Frontend URL
  'https://fullstack-todo-frontend.onrender.com', // Alternative frontend URL
  'https://fullstack-todoapp-frontend.onrender.com' // Alternative frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

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
