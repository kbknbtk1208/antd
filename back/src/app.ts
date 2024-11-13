import { router } from "./router";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import { Server } from "socket.io";
import { errorHandler } from "./router/errorHandler";
import { createServer } from "http";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const httpServer = createServer(app);

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.use(express.json({ limit: "100mb" }));

// CORS設定。異なるURLからでも呼び出せるようにする
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.status(200);
  }
  next();
});

// jsonを使えるようにする
app.use(express.json());

// サーバ起動
const port = process.env.PORT || 50002;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.use("/api", router);

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${3000}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  try {
    const cookie = socket.handshake.headers.cookie;
    const token = cookie.split("antd_token=")[1];
    console.log({ token, cookie });
    const payload = jwt.verify(token, process.env.AUTH_SECRET_KEY) as {
      id: string;
    };
    socket.data.user = payload;
  } catch (e) {
    console.log(e);
  }
  next();
});

io.on("connection", (socket) => {
  console.log(`connected ${socket.id}`);
  // socket.emit("hello", `user:${socket.data.user.id}`);

  if (socket.data.user) {
    console.log({ userId: socket.data.user.id });
    socket.join(socket.data.user.id);
  }

  socket.on("send", (message) => {
    if (socket.data.user) {
      console.log(`${socket.id} send ${message}`);
      io.emit("receiveMessage", {
        id: socket.data.user.id,
        message,
        date: new Date().toISOString(),
      });
    }
  });
});

const socketPort = 50003;
httpServer.listen(socketPort, () => {
  console.log(`Server is running on port ${socketPort}`);
});
