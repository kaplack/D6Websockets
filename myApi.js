const { SlowBuffer } = require("buffer");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Contenedor = require("./helper");

const routerProduct = require("./router/products.router");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server);

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

//Template Engines

const test1 = new Contenedor("productos.txt");
const productos = test1.getAll();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("main", {
    urlProd: "home",
    // products: productos,
    // listExists: true,
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
});

app.use("/productos", routerProduct);

app.listen(8080);
