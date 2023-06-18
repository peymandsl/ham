const Event = require("../models/eventModel");
const User = require("../models/userModel");
const EventParticipant = require("../models/eventParticipantModel");
import { getUserId } from "./UsersController";
const axios = require("axios");

const {} = require("mongodb");

const CreateEvent = async ({
  event_title,
  event_type,
  selectState,
  selectCity,
  event_price,
  hard_ship,
  event_summery,
  event_summery_continue,
  club_services_items,
  club_service_description,
  breakfast_service,
  event_status,
  lunch_service,
  dinner_service,
  mid_meal_service,
  essentialEq,
  recomendedEq,
  startEventDate,
  endEventDate,
  travel_days,
  enterance_rules,
  cancellation_rules,
  stayingLocation,
  tavel_start_description,
  entertainments,
  event_number,
  last_second,
  peak_height,
  discount_code,
  discount_percent,
  register_deadline,
  event_owner,
  event_capacity,
  peak_name,
  transfer_type,
  entertainments_Payment,
  recommended_list,
  eventBanner,
}) => {
  try {
    const event = await Event.create({
      event_title,
      event_type,
      selectState,
      selectCity,
      event_price,
      event_status,
      hard_ship,
      event_summery,
      event_summery_continue,
      club_services_items,
      club_service_description,
      breakfast_service,
      lunch_service,
      dinner_service,
      mid_meal_service,
      essentialEq,
      recomendedEq,
      startEventDate,
      endEventDate,
      travel_days,
      enterance_rules,
      cancellation_rules,
      stayingLocation,
      tavel_start_description,
      entertainments,
      event_number,
      last_second,
      peak_height,
      discount_code,
      discount_percent,
      register_deadline,
      event_owner,
      event_capacity,
      peak_name,
      transfer_type,
      entertainments_Payment,
      recommended_list,
      eventBanner,
    });

    const eventOwner = await User.findOne({ _id: event_owner });
    eventOwner.club_events.push(event._id);
    await eventOwner.save();

    return { event };
  } catch (err) {
    throw err;
  }
};

const EditEvent = async ({ editedData, eventId }) => {
  const findEvent = await Event.findById({ _id: eventId });
  if (!findEvent) {
    return {
      message: "برنامه مورد نظر پیدا نشد.",
      status: "ERROR",
    };
  } else {
    var myquery = { _id: eventId };
    var newvalues = { $set: { ...editedData } };
    await Event.updateOne(myquery, newvalues);

    const updatedEvent = await Event.find({ _id: eventId }).populate(
      "event_owner"
    );

    return {
      status: "SUCCESS",
      message: "اطلاعات شما به روز رسانی شد",
      data: updatedEvent,
    };
  }
};

const sendSms = ({ number, text }) => {
  const sendMessage = axios.post(
    `http://ws3584.isms.ir/sendWS?username=${process.env.SMS_PANEL_USER}&password=${process.env.SMS_PANEL_PASSWORD}&mobiles[]=${number}&body= ${text} `
  );
  return sendMessage;
};

const eventTypeFilter = async ({ event_type, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findEvents = await User.findById(userID).populate({
      path: "club_events",
      match: {
        event_type,
      },
      populate: {
        path: "event_owner",
      },
    });

    if (findEvents.club_events.length > 0) {
      return {
        data: findEvents.club_events,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findEvents = await Event.find({ event_type }).populate(
      "event_owner",
      {
        user_avatar: 1,
      }
    );
    if (findEvents.length > 0) {
      return {
        data: findEvents,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const eventPriceFilter = async ({ priceRange, userID }) => {
  const findUser = await User.findById(userID);
  if (findUser?.club_name) {
    const findEvents = await User.findById(userID).populate({
      path: "club_events",
      match: {
        event_price: {
          $gte: priceRange[0],
          $lte: priceRange[1],
        },
      },
      populate: {
        path: "event_owner",
      },
    });

    if (findEvents.club_events.length > 0) {
      return {
        data: findEvents.club_events,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findEvents = await Event.find({
      event_price: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    }).populate("event_owner", {
      user_avatar: 1,
    });
    if (findEvents.length > 0) {
      return {
        data: findEvents,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "2برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  }
  // return findEvents;
};

const eventHardshipFilter = async ({ hard_ship, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findEvents = await User.findById(userID).populate({
      path: "club_events",
      match: {
        hard_ship,
      },
      populate: {
        path: "event_owner",
        select: "user_avatar",
      },
    });
    if (findEvents.club_events.length > 0) {
      return {
        data: findEvents.club_events,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findEvents = await Event.find({ hard_ship }).populate("event_owner", {
      user_avatar: 1,
    });
    if (findEvents.length > 0) {
      return {
        data: findEvents,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  }
  // return findEvents;
};

const eventProvienceFilter = async ({ selectState, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findEvents = await User.findById(userID).populate({
      path: "club_events",
      match: {
        selectState,
      },
      populate: {
        path: "event_owner",
        select: "user_avatar",
      },
    });
    if (findEvents.club_events.length > 0) {
      return {
        data: findEvents.club_events,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findEvents = await Event.find({ selectState }).populate(
      "event_owner",
      {
        user_avatar: 1,
      }
    );
    if (findEvents.length > 0) {
      return {
        data: findEvents,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const eventLastSecondFilter = async ({ last_second, userID }) => {
  const findUser = await User.findById(userID);

  if (findUser?.club_name) {
    const findEvents = await User.findById(userID).populate({
      path: "club_events",
      match: {
        last_second,
      },
      populate: {
        path: "event_owner",
        select: "user_avatar",
      },
    });
    if (findEvents.club_events.length > 0) {
      return {
        data: findEvents.club_events,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  } else {
    const findEvents = await Event.find({ last_second }).populate(
      "event_owner",
      {
        user_avatar: 1,
      }
    );
    if (findEvents.length > 0) {
      return {
        data: findEvents,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const eventsByProvience = async ({ selectState, role }) => {
  const provienceEventsCount = await Event.countDocuments({
    selectState,
    event_status: "confirm",
  });
  return {
    data: provienceEventsCount,
    status: "SUCCESS",
  };
};

const eventsByEventType = async ({ event_type }) => {
  const EventTypesCount = await Event.countDocuments({
    event_type,
  });
  if (EventTypesCount > 0) {
    return {
      data: EventTypesCount,
      status: "SUCCESS",
    };
  } else {
    return {
      data: "برنامه ای یافت نشد",
      status: "ERROR",
    };
  }
};

const getEventsList = async ({ userID, eventSort, role }) => {
  const findUser = await User.findById(userID);
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
      sortType = { event_price: 1 };
      break;
    case "highest":
      sortType = { event_price: -1 };
      break;
    case "discount":
      sortType = { discount_percent: -1 };
      break;
    default:
      console.log("default");
  }

  if (role == "club") {
    const findEvents = await User.findById(userID).populate({
      path: "club_events",
      populate: {
        path: "event_owner",
        select: "user_avatar",
      },
      options: { sort: sortType },
    });
    // .sort({
    //   hard_ship: -1,
    // });
    if (findEvents.club_events.length > 0) {
      return {
        data: findEvents.club_events,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "NO-DATA",
      };
    }
  } else if (role == "user") {
    const eventsList = await Event.find({ event_status: "confirm" }, {})
      .populate("event_owner", { user_avatar: 1, mobile: 1, club_name: 1 })
      .populate({
        path: "event_participants",
        populate: {
          path: "participant",
        },
      })
      .sort(sortType);
    if (eventsList.length > 0) {
      return {
        data: eventsList,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "NO-DATA",
      };
    }
  } else if (role == "admin") {
    const eventsList = await Event.find({})
      .populate("event_owner", { user_avatar: 1, mobile: 1, club_name: 1 })
      .populate({
        path: "event_participants",
        populate: {
          path: "participant",
        },
      })
      .sort(sortType);
    if (eventsList.length > 0) {
      return {
        data: eventsList,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه ای یافت نشد",
        status: "NO-DATA",
      };
    }
  }
};

const lastsecondEvents = async () => {
  const eventsList = await Event.find(
    { last_second: true, event_status: "confirm" },
    {
      _id: 1,
      club_name: 1,
      hard_ship: 1,
      peak_name: 1,
      selectCity: 1,
      event_type: 1,
      event_price: 1,
      eventBanner: 1,
      last_second: 1,
      peak_height: 1,
      event_title: 1,
      selectState: 1,
      travel_days: 1,
      event_status: 1,
      startEventDate: 1,
      endEventDate: 1,
      event_capacity: 1,
      discount_percent: 1,
      register_deadline: 1,
    }
  )
    .sort("-created")
    .limit(10);
  if (!eventsList) {
    return {
      message: "برنامه مورد نظر پیدا نشد.",
      status: "ERROR",
    };
  } else {
    return {
      status: "SUCCESS",
      data: eventsList,
    };
  }
};

const getClubEventsList = async (_id) => {
  try {
    const clubEventsList = await User.findOne(_id, { user_avatar: 1 }).populate(
      {
        path: "club_events",
        populate: {
          path: "event_owner",
        },
      }
    );
    return clubEventsList;
  } catch (err) {
    throw err;
  }
};

const eventStatus = async ({ event_status, _id, userId }) => {
  let status;
  switch (event_status) {
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
      console.log(event_status);
      break;
  }
  const findEvent = await Event.findById({ _id })
    .populate({
      path: "event_participants",
      populate: {
        path: "participant",
      },
    })
    .populate("event_owner");
  if (!findEvent) {
    return {
      message: "برنامه مورد نظر پیدا نشد.",
      status: "ERROR",
    };
  } else {
    var myquery = { _id: findEvent._id };
    var newvalues = { $set: { event_status: event_status } };
    await Event.updateOne(myquery, newvalues);
    var userQuery = { _id: findEvent.event_owner._id };
    var userNewvalues = {
      $push: {
        user: userId && userId,
        messages: {
          content: `برنامه ${findEvent.event_title} شما ${status}`,
          read: false,
          event: findEvent._id,
        },
      },
    };

    const participant = {
      content: `برنامه ${findEvent.event_title} ${status}`,
      read: false,
      event: findEvent._id,
    };

    await User.updateMany(
      { user_events: _id },
      {
        $push: { messages: participant },
      }
    );

    await User.findByIdAndUpdate(userQuery, userNewvalues, { new: true });
    const updatedEvents = await Event.find().populate("event_owner");

    return {
      status: "SUCCESS",
      message: "اطلاعات شما به روز رسانی شد",
      data: updatedEvents,
    };
  }
};

const getEvent = async ({ eventId }) => {
  try {
    const event = await Event.findOne({ _id: eventId })
      .populate("event_owner", { club_name: 1, user_avatar: 1 })
      .populate({
        path: "event_participants",
        populate: {
          path: "participant",
        },
      });

    if (event) {
      return {
        data: event,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "برنامه مورد نظر یافت نشد",
        status: "ERROR",
      };
    }
  } catch (err) {
    return {
      message: "برنامه مورد نظر یافت نشد",
      status: "ERROR",
    };
  }
};

const getEventsByCity = async ({ city }) => {
  const provienceEventsCount = await Event.countDocuments({
    selectState: city,
    event_status: "confirm",
  });
  if (provienceEventsCount == 0) {
    return {
      data: provienceEventsCount,
      status: "SUCCESS",
    };
  } else {
    try {
      const events = await Event.find({
        selectState: city,
        event_status: "confirm",
      })
        .populate("event_owner", { user_avatar: 1, mobile: 1, club_name: 1 })
        .populate({
          path: "event_participants",
          populate: {
            path: "participant",
          },
        });

      if (events) {
        return {
          data: events,
          status: "SUCCESS",
        };
      } else {
        return {
          message: "برنامه مورد نظر یافت نشد",
          status: "ERROR",
        };
      }
    } catch (err) {
      return {
        message: "برنامه مورد نظر یافت نشد",
        status: "ERROR",
      };
    }
  }
};
const getEventsByType = async ({ type }) => {
  const typeEventsCount = await Event.countDocuments({
    event_type: type,
    event_status: "confirm",
  });
  if (typeEventsCount == 0) {
    return {
      data: typeEventsCount,
      status: "SUCCESS",
    };
  } else {
    try {
      const events = await Event.find({
        event_type: type,
        event_status: "confirm",
      })
        .populate("event_owner", { user_avatar: 1, mobile: 1, club_name: 1 })
        .populate({
          path: "event_participants",
          populate: {
            path: "participant",
          },
        });

      if (events) {
        return {
          data: events,
          status: "SUCCESS",
        };
      } else {
        return {
          message: "برنامه مورد نظر یافت نشد",
          status: "ERROR",
        };
      }
    } catch (err) {
      return {
        message: "برنامه مورد نظر یافت نشد",
        status: "ERROR",
      };
    }
  }
};

const AddParticipant = async ({ _id }) => {
  const findEvent = await Event.findOne({ _id });

  findEvent.event_participants.push(event._id);
  await eventOwner.save();

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
};
const CreateComment = async ({ eventId, comment }) => {
  const findUserID = await getUserId({ username: comment.user.mobile });
  const AddComment = await Event.findByIdAndUpdate(
    eventId,
    { $push: { comments: { user: findUserID, content: comment.content } } },
    { new: true }
  );
  return AddComment;
};

module.exports = {
  getEvent,
  EditEvent,
  eventStatus,
  CreateEvent,
  CreateComment,
  getEventsList,
  AddParticipant,
  getEventsByCity,
  getEventsByType,
  eventTypeFilter,
  eventPriceFilter,
  lastsecondEvents,
  eventsByEventType,
  getClubEventsList,
  eventsByProvience,
  eventHardshipFilter,
  eventProvienceFilter,
  eventLastSecondFilter,
};
