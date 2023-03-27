import { cartService, orderService } from "../services/services.js";
import { returnMessage } from "../utils/functions.js";

const getOrders = async (req, res) => {
  const result = await orderService.getAll();
  const ordersIds = result.payload
    ? result.payload.map((order) => order.id)
    : [];
  res
    .status(200)
    .json(returnMessage(false, 200, "Pedidos encontrados", ordersIds));
};

const getOrderById = async (req, res) => {
  const result = await orderService.getOneById(req.params.id);
  res.status(result.code).json(result);
};

const getOrderByUserId = async (req, res) => {
  const result = await orderService.getAll({ user: req.user.id });
  res.status(result.code).json(result);
};

const createOrder = async (req, res) => {
  const currentCart = await cartService.getOne({ user: req.user.id });
  if (currentCart.code !== 200) {
    res.status(currentCart.code).json(currentCart);
    return;
  }

  if (!currentCart.payload || !currentCart.payload.productos.length) {
    res
      .status(400)
      .json(
        returnMessage(
          true,
          400,
          "No hay productos en el carrito. Agregué alguno para poder realizar el pedido."
        )
      );
    return;
  }

  const result = await orderService.createOne({
    productos: currentCart.payload.productos,
    user: req.user.id,
    orderNumber: currentCart.payload.id,
  });

  if (result.code === 201) {
    await cartService.deleteOneById(currentCart.payload.id);
  }

  res.status(result.code).json(result);
};

export default {
  getOrders,
  getOrderById,
  getOrderByUserId,
  createOrder,
};
