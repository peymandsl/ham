const mongoose = require("mongoose");
const shortid = require("shortid");
const messageSchema = require("./messageModel");

const { Schema } = mongoose;
require("./eventModel");
require("./coursModel");

const userSchema = new Schema({
  user_gender: { type: String, required: false },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  father_name: { type: String, required: false },
  emergency_tell: { type: String, required: false },
  mobile: { type: String, required: false },
  national_id: { type: String, required: false },
  club_create_date: { type: String, required: false },
  insta_profile: { type: String, required: false },
  telegram_id: { type: String, required: false },
  whatsapp_number: { type: String, required: false },
  certificate_No: { type: String, required: false },
  user_email: { type: String, required: false },
  club_name: { type: String, required: false },
  user_state: { type: String, required: false },
  user_city: { type: String, required: false },
  club_name: { type: String, required: false },
  club_description: { type: String, required: false },
  club_website: { type: String, required: false },
  date_of_birth: { type: Date, required: false },
  authSmsCode: { type: String, required: false },
  user_role: { type: String, required: false },
  created: { type: Date, default: Date.now },
  user_status: { type: String, require: false },
  club_event_types: { type: Array, require: false },
  // event_owner: { type: Schema.Types.ObjectId },
  club_events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  club_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" }],
  user_events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  user_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" }],
  messages: [messageSchema],
  user_favorite_events: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  ],
  user_favorite_courses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
  ],
  user_favorite_clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  user_avatar: {
    type: String,
    require: false,
  },
  club_banner: {
    type: String,
    default: "1.jpg",
  },
});

userSchema.set("toJSON", { gettes: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  // delete obj._id;
  delete obj.__v;
  return obj;
};

// userSchema.pre(/^find/, function () {
//   this.populate("club_events");
//   this.populate("user_events");
//   this.populate("user_favorite_events");
//   this.populate("logo");
// });
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
