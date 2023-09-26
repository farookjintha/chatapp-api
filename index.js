require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("./db/connect");

const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

db();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json()); // Middleware to parse req into JSON
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello world!" });
});

// Attaching custom middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} has joined the room.`);
  });
  socket.on("send-message", (data) => {
    console.log("DATA SENT: ", data);
    socket.to(data.room).emit("receive-message", data);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected.", socket.id);
  });
});

// .emit(connection) (SENDER) -> (RECEIVER) .on('connection')
// .emit(join-room) -> .on('join-room')

server.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});

// index.js -> routes -> controllers -> db operation -> controller -> routes -> index.js

// CORS -> Cross Origin Resource Sharing

// http://localhost:3000
// http://localhost:5000

// Register
// Sign-in
// Sign-out

// Forgot-password
// Reset-Password

// Google Auth or OAuth or Auth0
