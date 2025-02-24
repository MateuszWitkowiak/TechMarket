const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const https = require('https')
const app = express()
const server = https.createServer(app)
const cloudinary = require('cloudinary');
const { env } = require('process')

app.use(cors({
    origin: "https://localhost:3000",
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization']
}));

mongoose.connect("mongodb+srv://boskiraptor2:oFocmXHWMq3zDsjo@cluster0.1nr7u.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

const authRoutes = require("./api/auth")

app.use("/api/auth", authRoutes)

app.use(express.json())
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

server.listen(3001, () => {
    console.log("Server is running on port 3001")
})