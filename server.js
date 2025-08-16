const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => res.json({ ok: true, msg: "Indian Cards War API" }));
app.get("/health", (req, res) => res.send("ok")); // health check

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET","POST"] }
});

// demo socket events
io.on("connection", (socket) => {
  console.log("client:", socket.id);
  socket.on("ping", () => socket.emit("pong"));
  socket.on("disconnect", () => console.log("left:", socket.id));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("listening on", PORT));
