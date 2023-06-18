const mongoose = require("mongoose");
require("./userModel");

const { Schema } = mongoose;

const eventParticipantSchema = new Schema({
  payment_price: { type: String, required: false },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

eventParticipantSchema.set("toJSON", { gettes: true });
eventParticipantSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  // delete obj._id;
  delete obj.__v;
  return obj;
};
// eventParticipantSchema.pre(/^find/, function () {
//   this.populate("participant");
// });
module.exports =
  mongoose.models.EventParticipant ||
  mongoose.model("EventParticipant", eventParticipantSchema);
