import mongoose from "mongoose";
export default class Order {
  constructor(data) {
    this.data = data;
  }

  static get model() {
    return "Orders";
  }

  static get schema() {
    return {
      productos: { type: Array, required: true },
      orderNumber: { type: String, required: true },
      state: { type: String, required: true, default: "generated" },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    };
  }
}
