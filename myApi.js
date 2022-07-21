const { SlowBuffer } = require("buffer");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const Contenedor = require("./helper");

const routerProduct = require("./router/products.router");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server);

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static(__dirname + "/public"));

//Template Engines

const test1 = new Contenedor("productos.txt");
const productos = test1.getAll();

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("socketio", io);

app.get("/", (req, res) => {
  res.render("main", {
    products: test1.getAll(),
    listExists: true,
  });
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

io.on("connection", (socket) => {
  console.log("Somebody conected");
  socket.on("chat-in", (data) => {
    const time = new Date().toLocaleTimeString();
    const dataOut = {
      msn: data.msn,
      username: data.username,
      time,
    };

    console.log(dataOut);
    io.sockets.emit("chat-out", dataOut);
  });

  socket.on("post", () => {
    console.log("recibido");

    io.sockets.emit("newItem");
  });
});

app.use("/productos", routerProduct);

server.listen(8080, () => console.log("Server run http://localhost:8080"));
