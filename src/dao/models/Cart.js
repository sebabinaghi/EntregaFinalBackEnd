import mongoose from "mongoose";

export default class Cart {
  constructor(data) {
    this.data = data;
  }

  static get model() {
    return "Carts";
  }

  static get schema() {
    return {
      productos: { type: Array, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    };
  }
}
