import express from "express";
import { urlencoded } from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import todoRoute from "./routes/todoRoute.js";
import cors from "cors";
import { homeContent } from "./utils/homeContent.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Security middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'https://fullstack-todoapp-gyay.onrender.com',
  'https://fullstack-todo-frontend-hwje.onrender.com',
  'https://fullstack-todo-frontend.onrender.com',
  'https://fullstack-todoapp-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS Rejected Origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", todoRoute);

// Home route
app.get("/", (req, res) => {
  res.send(homeContent);
});

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});

const __dirname = path.resolve();

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../FRONTEND/dist');
  app.use(express.static(distPath));

  // Catch-all handler for SPA (must be last)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack || err.message);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server started on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});
