import { cartService } from "../services/services.js";

const currentSession = async (req, res) => {
  let userCart;
  userCart = await cartService.getOne({
    user: req.user.id,
  });
  if (userCart.code === 404) {
    userCart = await cartService.createOne({
      user: req.user.id,
      products: [],
    });
  }
  res.send({
    user: req.user,
    cart: userCart.payload,
  });
};

export default {
  currentSession,
};
