import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Set view engine and static folder
app.set("view engine", "ejs");
app.set('views', path.join(path.resolve(), "src/views"));
app.use(express.static(path.join(path.resolve(), 'src/public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
