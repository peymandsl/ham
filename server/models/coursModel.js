const mongoose = require("mongoose");
const shortid = require("shortid");

const { Schema } = mongoose;
require("./userModel");
require("./coursParticipantModel");

// const commentSchema = require("./commentModel");
const voteSchema = require("./voteModel");

const coursSchema = new Schema({
  created: { type: Date, default: Date.now },
  cours_title: { type: String, required: false },
  cours_instructor: { type: String, required: false },
  coursSubjects: { type: Array, required: false },
  cours_type: { type: String, required: false },
  selectState: { type: String, required: false },
  cours_city: { type: String, required: false },
  hard_ship: { type: Number, required: false },
  cours_summery: { type: String, required: false },
  cours_summery_continue: { type: String, required: false },
  breakfast_service: { type: String, required: false },
  dinner_service: { type: String, required: false },
  lunch_service: { type: String, required: false },
  mid_meal_service: { type: String, required: false },
  club_service_description: { type: String, required: false },
  club_services_items: { type: Object, required: false },
  essential_list: { type: Object, required: false },
  recommended_list: { type: Object, required: false },
  travel_days: { type: String, required: false },
  tavel_start_description: { type: String, required: false },
  travel_lenghth: { type: String, required: false },
  endEventDate: { type: String, required: false },
  startEventDate: { type: String, required: false },
  start_travel_time: { type: String, required: false },
  selectCity: { type: String, required: false },
  stayingLocation: { type: Object, required: false },
  entertainments: { type: Object, required: false },
  essentialEq: { type: Object, required: false },
  cancellation_rules: { type: String, required: false },
  enterance_rules: { type: String, required: false },
  cours_owner: { type: Schema.Types.ObjectId, ref: "User" },
  // comments: [commentSchema],
  votes: [voteSchema],
  score: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  cours_participants: [
    { type: Schema.Types.ObjectId, ref: "CoursParticipant" },
  ],
  payment_price: { type: Number, required: false },
  register_deadline: { type: String, required: false },
  discount_percent: { type: String, required: false },
  discount_code: { type: String, required: false },
  peak_height: { type: Number, required: false },
  last_second: { type: Boolean, required: false },
  certificate: { type: Boolean, required: false },
  admin_accepted: { type: Boolean, require: false },
  cours_number: { type: Number, require: false },
  cours_capacity: { type: String, require: false },
  cours_price: { type: String, require: false },
  peak_name: { type: String, require: false },
  cours_status: { type: String, require: false, default: "waiting" },
  transfer_type: { type: String, require: false },
  entertainments_Payment: { type: Boolean, require: false },
  coursBanner: { type: String, require: false },
});

coursSchema.set("toJSON", { gettes: true });
coursSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  // delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.models.Cours || mongoose.model("Cours", coursSchema);
