import { Router } from "express";
import orderController from "../../controllers/orders.js";
import { passportCall } from "../../services/external/passport-config.js";

const ordersApiRouter = new Router();

//GET
ordersApiRouter.get("/", passportCall("jwt"), orderController.getOrders);

//GET ONE
ordersApiRouter.get(
  "/mis-ordenes",
  passportCall("jwt"),
  orderController.getOrderByUserId
);

ordersApiRouter.get("/:id", passportCall("jwt"), orderController.getOrderById);

//POST
ordersApiRouter.post("/", passportCall("jwt"), orderController.createOrder);

export default ordersApiRouter;
