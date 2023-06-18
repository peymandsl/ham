const mongoose = require("mongoose");
const shortid = require("shortid");

const { Schema } = mongoose;
require("./userModel");
require("./eventParticipantModel");

// const commentSchema = require("./commentModel");
const voteSchema = require("./voteModel");

const eventSchema = new Schema({
  created: { type: Date, default: Date.now },
  event_title: { type: String, required: false },
  event_type: { type: String, required: false },
  selectState: { type: String, required: false },
  event_city: { type: String, required: false },
  hard_ship: { type: Number, required: false },
  event_summery: { type: String, required: false },
  event_summery_continue: { type: String, required: false },
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
  event_owner: { type: Schema.Types.ObjectId, ref: "User" },
  // comments: [commentSchema],
  votes: [voteSchema],
  score: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  event_participants: [
    { type: Schema.Types.ObjectId, ref: "EventParticipant" },
  ],
  payment_price: { type: Number, required: false },
  register_deadline: { type: String, required: false },
  discount_percent: { type: String, required: false },
  discount_code: { type: String, required: false },
  peak_height: { type: Number, required: false },
  last_second: { type: Boolean, required: false },
  admin_accepted: { type: Boolean, require: false },
  event_number: { type: Number, require: false },
  event_capacity: { type: String, require: false },
  event_price: { type: String, require: false },
  peak_name: { type: String, require: false },
  event_status: { type: String, require: false, default: "waiting" },
  transfer_type: { type: String, require: false },
  entertainments_Payment: { type: Boolean, require: false },
  eventBanner: { type: String, require: false },
});

eventSchema.set("toJSON", { gettes: true });
eventSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  // delete obj._id;
  delete obj.__v;
  return obj;
};

// eventSchema.pre(/^find/, function () {
//   this.populate("event_owner");
//   this.populate("event_participants");
// });
module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
