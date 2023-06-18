const EventParticipant = require("../models/eventParticipantModel");
const User = require("../models/userModel");
const Event = require("../models/eventModel");
const { sendSms } = require("../../utils/sendSms");

const AddParticipant = async ({ participant, event_id, payment_price }) => {
  try {
    const eventParticipant = await EventParticipant.create({
      payment_price,
      participant,
      event: event_id,
    });

    const findEvent = await Event.findOne({ _id: event_id });
    const findUser = await User.findOne({ _id: participant });

    findEvent.event_participants.push(eventParticipant._id);
    findUser.user_events.push(event_id);

    await findEvent.save();
    await findUser.save();

    if (!findEvent) {
      return {
        message: "برنامه مورد نظر یافت نشد.",
        status: "ERROR",
      };
    } else {
      return {
        message: "با موفقت ثبت نام شدید.",
        status: "SUCCESS",
      };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  AddParticipant,
};
