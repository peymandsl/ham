const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: false },
    created: { type: Date, default: Date.now },
    read: { type: Boolean, default: false, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    cours: { type: Schema.Types.ObjectId, ref: "Cours" },
  }
  // { _id: false }
);

module.exports = messageSchema;
