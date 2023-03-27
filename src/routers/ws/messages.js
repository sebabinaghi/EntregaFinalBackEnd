import { messageService } from "../../services/services.js";

export default async function configurarSocket(socket, sockets) {
  const messages = await messageService.getAll();
  socket.emit("messages", messages.payload);

  socket.on("sendMessage", async (mensaje) => {
    await messageService.createOne(mensaje);
    const messages = await messageService.getAll();
    sockets.emit("messages", messages.payload);
  });
}
