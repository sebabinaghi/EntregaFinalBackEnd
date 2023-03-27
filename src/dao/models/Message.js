import mongoose from "mongoose";
export default class Message {
  constructor(data) {
    this.data = data;
  }

  static get model() {
    return "Messages";
  }

  static get schema() {
    return {
      text: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    };
  }
}
