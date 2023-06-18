const mongoose = require("mongoose");
require("./userModel");

const { Schema } = mongoose;

const coursParticipantSchema = new Schema({
  payment_price: { type: String, required: false },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cours: { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
});

coursParticipantSchema.set("toJSON", { gettes: true });
coursParticipantSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  // delete obj._id;
  delete obj.__v;
  return obj;
};
// coursParticipantSchema.pre(/^find/, function () {
//   this.populate("participant");
// });
module.exports =
  mongoose.models.CoursParticipant ||
  mongoose.model("CoursParticipant", coursParticipantSchema);
