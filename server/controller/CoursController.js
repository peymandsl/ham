const Event = require("../models/eventModel");
const User = require("../models/userModel");
const Cours = require("../models/coursModel");
import { getUserId } from "./UsersController";
const {} = require("mongodb");

const CreateCours = async ({
  certificate,
  coursSubjects,
  cours_capacity,
  cours_instructor,
  cours_owner,
  cours_price,
  cours_summery,
  cours_summery_continue,
  cours_title,
  cours_type,
  discount_code,
  discount_percent,
  endEventDate,
  enterance_rules,
  essentialEq,
  coursBanner,
  hard_ship,
  last_second,
  cancellation_rules,
  register_deadline,
  selectCity,
  selectState,
  startEventDate,
  stayingLocation,
  tavel_start_description,
  travel_days,
}) => {
  try {
    const cours = await Cours.create({
      certificate,
      coursSubjects,
      cours_capacity,
      cours_instructor,
      cours_owner,
      cancellation_rules,
      cours_price,
      cours_summery,
      cours_summery_continue,
      cours_title,
      cours_type,
      discount_code,
      discount_percent,
      endEventDate,
      enterance_rules,
      essentialEq,
      coursBanner,
      hard_ship,
      last_second,
      register_deadline,
      selectCity,
      selectState,
      startEventDate,
      stayingLocation,
      tavel_start_description,
      travel_days,
    });
    const coursOwner = await User.findOne({ _id: cours_owner });
    coursOwner.club_courses.push(cours._id);
    await coursOwner.save();

    return { cours };
  } catch (err) {
    throw err;
  }
};

const getCours = async ({ coursId }) => {
  try {
    const cours = await Cours.findOne({ _id: coursId })
      .populate("cours_owner", { club_name: 1, user_avatar: 1 })
      .populate({
        path: "cours_participants",
        populate: {
          path: "participant",
        },
      });

    if (cours) {
      return {
        data: cours,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره مورد نظر یافت نشد",
        status: "ERROR",
      };
    }
  } catch (err) {
    return {
      message: "دوره مورد نظر یافت نشد",
      status: "ERROR",
    };
  }
};

const sendSms = ({ number, text }) => {
  const sendMessage = axios.post(
    `http://ws3584.isms.ir/sendWS?username=${process.env.SMS_PANEL_USER}&password=${process.env.SMS_PANEL_PASSWORD}&mobiles[]=${number}&body= ${text} `
  );
  return sendMessage;
};

const CoursesList = async ({ sortType, cours_status }) => {
  const coursesList = await Cours.find(
    { cours_status },
    {
      _id: 1,
      score: 1,
      votes: 1,
      views: 1,
      mobile: 1,
      club_name: 1,
      hard_ship: 1,
      peak_name: 1,
      selectCity: 1,
      cours_type: 1,
      cours_price: 1,
      coursBanner: 1,
      last_second: 1,
      last_second: 1,
      peak_height: 1,
      cours_title: 1,
      selectState: 1,
      travel_days: 1,
      cours_status: 1,
      startEventDate: 1,
      cours_capacity: 1,
      register_deadline: 1,
      cours_participants: 1,
    }
  )
    .populate("cours_owner", { user_avatar: 1, mobile: 1, club_name: 1 })
    .populate({
      path: "cours_participants",
      populate: {
        path: "participant",
      },
    })
    .sort(sortType);
  if (coursesList.length > 0) {
    return {
      data: coursesList,
      status: "SUCCESS",
    };
  } else {
    return {
      message: "دوره ای یافت نشد",
      status: "NO-DATA",
    };
  }
};

const EditCours = async ({ editedData, coursId }) => {
  const findCours = await Cours.findById({ _id: coursId });
  if (!findCours) {
    return {
      message: "دوره مورد نظر پیدا نشد.",
      status: "ERROR",
    };
  } else {
    var myquery = { _id: coursId };
    var newvalues = { $set: { ...editedData } };
    await Cours.updateOne(myquery, newvalues);

    const updatedCours = await Cours.find({ _id: coursId }).populate(
      "cours_owner"
    );

    return {
      status: "SUCCESS",
      message: "اطلاعات شما به روز رسانی شد",
      data: updatedCours,
    };
  }
};

const getCoursesList = async ({ userID, eventSort, role }) => {
  // const findUser = userID && (await User.findById(userID));
  let sortType;
  switch (eventSort) {
    case "newest":
      sortType = { created: -1 };
      break;
    case "easiest":
      sortType = { hard_ship: 1 };
      break;
    case "hardest":
      sortType = { hard_ship: -1 };
      break;
    case "lowest":
      sortType = { cours_price: 1 };
      break;
    case "highest":
      sortType = { cours_price: -1 };
      break;
    case "discount":
      sortType = { discount_percent: -1 };
      break;
    default:
      sortType = { created: -1 };
  }

  if (role == "club") {
    const findCourses = await User.findById(userID).populate({
      path: "club_courses",
      populate: {
        path: "cours_owner",
        select: "user_avatar",
      },
      options: { sort: eventSort },
    });

    if (findCourses.club_courses.length > 0) {
      return {
        data: findCourses.club_courses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "NO-DATA",
      };
    }
  } else if (role == "user") {
    return CoursesList({ sortType, cours_status: "confirm" });
  } else if (role == "admin") {
    return CoursesList({ sortType });
  }
};

const coursPriceFilter = async ({ priceRange, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findCours = await User.findById(userID).populate({
      path: "club_courses",
      match: {
        cours_price: {
          $gte: priceRange[0],
          $lte: priceRange[1],
        },
      },
      populate: {
        path: "cours_owner",
      },
    });
    if (findCours.club_courses.length > 0) {
      return {
        data: findCours.club_courses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findCours = await Cours.find({
      cours_price: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    }).populate("cours_owner", {
      user_avatar: 1,
    });
    if (findCours.length > 0) {
      return {
        data: findCours,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  }
  // return findEvents;
};

const coursTypeFilter = async ({ event_type, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const fiindCourses = await User.findById(userID).populate({
      path: "club_courses",
      match: {
        cours_type: event_type,
      },
      populate: {
        path: "cours_owner",
      },
    });

    if (fiindCourses.club_courses.length > 0) {
      return {
        data: fiindCourses.club_courses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const fiindCourses = await Cours.find({ cours_type: event_type }).populate(
      "cours_owner",
      {
        user_avatar: 1,
      }
    );
    if (fiindCourses.length > 0) {
      return {
        data: fiindCourses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const coursHardshipFilter = async ({ hard_ship, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findCourses = await User.findById(userID).populate({
      path: "club_courses",
      match: {
        hard_ship,
      },
      populate: {
        path: "cours_owner",
        select: "user_avatar",
      },
    });
    if (findCourses.club_courses.length > 0) {
      return {
        data: findCourses.club_courses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findCourses = await Cours.find({ hard_ship }).populate(
      "cours_owner",
      {
        user_avatar: 1,
      }
    );
    if (findCourses.length > 0) {
      return {
        data: findCourses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  }
  // return findEvents;
};

const coursProvienceFilter = async ({ selectState, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findCourses = await User.findById(userID).populate({
      path: "club_courses",
      match: {
        selectState,
      },
      populate: {
        path: "cours_owner",
        select: "user_avatar",
      },
    });
    if (findCourses.club_courses.length > 0) {
      return {
        data: findCourses.club_courses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findCourses = await Cours.find({ selectState }).populate(
      "cours_owner",
      {
        user_avatar: 1,
      }
    );
    if (findCourses.length > 0) {
      return {
        data: findCourses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const coursLastSecondFilter = async ({ last_second, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findCourses = await User.findById(userID).populate({
      path: "club_courses",
      match: {
        last_second,
      },
      populate: {
        path: "cours_owner",
        select: "user_avatar",
      },
    });
    if (findCourses.club_courses.length > 0) {
      return {
        data: findCourses.club_courses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findCourses = await Cours.find({ last_second }).populate(
      "cours_owner",
      {
        user_avatar: 1,
      }
    );
    if (findCourses.length > 0) {
      return {
        data: findCourses,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "دوره ای یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const coursStatus = async ({ cours_status, _id, userId }) => {
  let status;
  switch (cours_status) {
    case "cancell":
      status = "لغو شد";
      break;
    case "suspend":
      status = "تعلیق شد";
      break;
    case "remove":
      status = "حذف شد";
      break;
    case "waiting":
      status = "در صف انتظار است";
      break;
    case "confirm":
      status = "تایید شد";
      break;

    default:
      console.log(cours_status);
      break;
  }
  const findCours = await Cours.findById({ _id });
  if (!findCours) {
    return {
      message: "دوره مورد نظر یافت نشد.",
      status: "ERROR",
    };
  } else {
    var myquery = { _id: findCours._id };
    var newvalues = { $set: { cours_status } };
    await Cours.updateOne(myquery, newvalues);

    var userQuery = { _id: findCours.cours_owner._id };
    var userNewvalues = {
      $push: {
        user: userId && userId,
        messages: {
          content: `دوره ${findCours.cours_title} شما ${status}`,
          read: false,
          cours: findCours._id,
        },
      },
    };

    const participant = {
      content: `دوره ${findCours.cours_title} ${status}`,
      read: false,
      cours: findCours._id,
    };

    await User.updateMany(
      { user_courses: _id },
      {
        $push: { messages: participant },
      }
    );

    await User.findByIdAndUpdate(userQuery, userNewvalues, { new: true });
    const updatedCourses = await Cours.find().populate("cours_owner");

    return {
      status: "SUCCESS",
      message: "اطلاعات شما به روز رسانی شد",
      data: updatedCourses,
    };
  }
};

const learningCourses = async () => {
  const coursesList = await Cours.find(
    { cours_status: "confirm" },
    {
      _id: 1,
      club_name: 1,
      hard_ship: 1,
      peak_name: 1,
      selectCity: 1,
      cours_type: 1,
      cours_price: 1,
      coursBanner: 1,
      last_second: 1,
      cours_title: 1,
      selectState: 1,
      travel_days: 1,
      cours_status: 1,
      startEventDate: 1,
      endEventDate: 1,
      cours_capacity: 1,
      discount_percent: 1,
      register_deadline: 1,
    }
  )
    .sort("-created")
    .limit(10);
  if (!coursesList) {
    return {
      message: "دوره مورد نظر پیدا نشد.",
      status: "ERROR",
    };
  } else {
    return {
      status: "SUCCESS",
      data: coursesList,
    };
  }
};
module.exports = {
  getCours,
  EditCours,
  coursStatus,
  CreateCours,
  getCoursesList,
  coursTypeFilter,
  learningCourses,
  coursPriceFilter,
  coursHardshipFilter,
  coursProvienceFilter,
  coursLastSecondFilter,
};
