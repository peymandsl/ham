const mongoose = require("mongoose");
const shortid = require("shortid");

const { Schema } = mongoose;

const mediaSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  alt: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: Number, required: false },
  media: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  created: { type: Date, default: Date.now, required: true },
});

mediaSchema.set("toJSON", { gettes: true });
mediaSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  // delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.models.Media || mongoose.model("Media", mediaSchema);
