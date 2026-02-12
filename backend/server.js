import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import messageRoutes from "./routes/message.route.js";

import connectMongoDB from "./db/connectMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

app.use(express.json({ limit: "5mb" })); // to parse the request body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://socio-sepia-delta.vercel.app"
    ],
    credentials: true,
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    // Try to find the built frontend in multiple possible locations
    const distPath = path.resolve(__dirname, "..", "dist");
    const frontendDistPath = path.resolve(__dirname, "..", "frontend", "dist");

    if (path.join(__dirname, "frontend/dist")) {
        app.use(express.static(path.join(__dirname, "frontend/dist")))
    } else {
        app.use(express.static(distPath))
    }

    app.get("*", (req, res) => {
        // Prefer root dist if it exists, fallback to frontend/dist
        const indexPath = path.resolve(__dirname, "frontend", "dist", "index.html");
        const rootIndexPath = path.resolve(__dirname, "..", "dist", "index.html");

        res.sendFile(rootIndexPath);
    })
}


// Only listen if not running as a Vercel function
if (!process.env.VERCEL) {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        connectMongoDB();
    });
}

export default app;