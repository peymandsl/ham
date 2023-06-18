const CoursParticipant = require("../models/coursParticipantModel");
const User = require("../models/userModel");
const Cours = require("../models/coursModel");

const AddParticipant = async ({ participant, cours_id, payment_price }) => {
  try {
    const coursParticipant = await CoursParticipant.create({
      payment_price,
      participant,
      cours: cours_id,
    });
    const findCours = await Cours.findOne({ _id: cours_id });
    const findUser = await User.findOne({ _id: participant });

    findCours.cours_participants.push(coursParticipant._id);
    findUser.user_courses.push(cours_id);

    await findCours.save();
    await findUser.save();

    if (!findCours) {
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
