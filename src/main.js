import compression from "compression";
import cors from "cors";
import express from "express";
import passport from "passport";
import config from "./config.js";
import {
  userRouter,
  cartRouter,
  productRouter,
  authRouter,
  orderRouter,
} from "./routers/api/index.js";
import { logger, initializePassportConfig } from "./services/external/index.js";
import { Server as Socket } from "socket.io";
import { Server as HttpServer } from "http";
import addMessagesHandlers from "./routers/ws/messages.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on("connection", async (socket) => {
  socket, io.sockets;
  addMessagesHandlers(socket, io.sockets);
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

initializePassportConfig();
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/usuarios", userRouter);
app.use("/api/pedidos", orderRouter);

app.use((req, res) => {
  logger.warn(`${req.method} ${req.url}`);
  res.sendStatus(404);
});

const connectedServer = httpServer.listen(config.PORT, () => {
  const port = connectedServer.address().port;
  console.log(`Server running at ${config.URL_BASE}${port} 🚀🚀!!`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);



