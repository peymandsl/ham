const User = require("../models/userModel");

const axios = require("axios");
const { verifyAuthCode, createToken } = require("../middleware/authentication");

const CheckUserExist = async ({ mobile }) => {
  const checkExistingUser = await User.findOne({ mobile });
  if (checkExistingUser) {
    return {
      message: "لطفا کد ارسال شده را وارد نمایید",
      status: "SIGN_IN",
    };
  } else {
    return { message: "لطفا اطلاعات خود را وارد نمایید", status: "KYC_CHECK" };
  }
};
const CheckKYC = async ({ Mobile, IdCode, BirthDate }) => {
  const kyc_auth = await axios
    .get(
      `https://inquery.ir/:60?Token=${process.env.KYC_TOKEN}&IdCode=${IdCode}&BirthDate=${BirthDate}&Mobile=${Mobile}`
    )
    .then((res) => {
      let kyc_check = res.data;
      if (kyc_check?.Result.Detail == "درخواست موفق") {
        return { ...kyc_check.Result, status: "KYC_CONFIRM" };
      } else {
        return { message: kyc_check?.Result.Detail, status: "SIGN_UP" };
      }
    });
  return kyc_auth;
};

const KycResult = async ({ OTP, ID }) => {
  const kyc_result = await axios
    .get(
      `https://inquery.ir/:60?Token=${process.env.KYC_TOKEN}&ID=${ID}&OTP=${OTP}`
    )
    .then((res) => {
      if (res?.data?.Result) {
        return { result: res?.data, status: "KYC_COMPELETED" };
      }
    });
  return { ...kyc_result };
};

const CreateUser = async ({
  Name,
  IdCode,
  Mobile,
  Family,
  Gender,
  BirthDate,
  FatherName,
}) => {
  const user = await User.create({
    mobile: Mobile,
    first_name: Name,
    last_name: Family,
    user_gender: Gender,
    national_id: IdCode,
    father_name: FatherName,
    date_of_birth: BirthDate,
  });
  return { user, status: "USER_REGISTERED" };
};

const CreateRandomKey = async ({ mobile }) => {
  const findUser = await User.findOne({ mobile });
  const randomKey = Math.floor(100000 + Math.random() * 900000);
  if (!findUser) {
    return {
      message: "حساب کاربری پیدا نشد.",
      status: "ERROR",
    };
  } else {
    var myquery = { _id: findUser._id };
    var newvalues = { $set: { authSmsCode: randomKey } };

    await User.updateOne(myquery, newvalues);
    axios.post(
      `http://ws3584.isms.ir/sendWS?username=${process.env.SMS_PANEL_USER}&password=${process.env.SMS_PANEL_PASSWORD}&mobiles[]=${mobile}&body= کد یکبارمصرف شما ${randomKey} می باشد. `
    );

    return { randomKey: randomKey, message: "کد یکبار مصرف ارسال شد" };
  }
};

const UserAuthentication = async ({ mobile, inputAuthCode }) => {
  // const checkUser = await User.findOne({ mobile });
  const checkUser = await User.findOne({ mobile })
    .populate("user_favorite_events")
    .populate("user_events")
    .populate("club_events");
  const {
    _id,
    messages,
    last_name,
    club_name,
    first_name,
    user_email,
    user_gender,
    authSmsCode,
    user_avatar,
    national_id,
    emergency_tell,
  } = checkUser;
  const checkAuthCode = await verifyAuthCode(inputAuthCode, authSmsCode);
  if (!checkAuthCode) {
    return {
      message: "کد وارد شده صحیح نمی باشد.",
      status: "ERROR",
    };
  } else {
    const token = await createToken({ mobile, first_name, last_name });

    const user = {
      _id,
      mobile,
      messages,
      last_name,
      club_name,
      first_name,
      user_email,
      user_gender,
      authSmsCode,
      user_avatar,
      national_id,
      emergency_tell,
    };
    return {
      token,
      user,
      status: "SUCCESS",
      message: "شما با موفقیت وارد شدید",
    };
  }
};

const GetUserInfo = async ({ _id }) => {
  const findUser = await User.findOne({ _id })
    .populate({
      path: "user_favorite_events",
      populate: [
        {
          path: "eventBanner",
        },
        {
          path: "event_owner",
        },
      ],
    })
    .populate({
      path: "user_favorite_clubs",
      populate: {
        path: "club_banner",
      },
    });

  if (!findUser) {
    return {
      message: "حساب کاربری پیدا نشد.",
      status: "ERROR",
    };
  } else {
    return { status: "SUCCESS", data: findUser };
  }
};

const GetUserRole = async ({ userId }) => {
  const findUser = await User.findById(userId);
  if (!findUser) {
    return {
      role: "user",
      status: "SUCCESS",
    };
  } else if (findUser.club_name && findUser.user_role !== "admin") {
    return { role: "club", status: "SUCCESS" };
  } else if (!findUser.club_name && findUser.user_role !== "admin") {
    return { role: "user", status: "SUCCESS" };
  } else if (!findUser.club_name && findUser.user_role == "admin") {
    return { role: "admin", status: "SUCCESS" };
  }
};
const getClubInfo = async ({ clubId }) => {
  try {
    const club = await User.findById(clubId).populate({
      path: "club_events",
      populate: {
        path: "event_owner",
      },
    });

    if (club) {
      return {
        data: club,
        status: "SUCCESS",
      };
    } else {
      return {
        message: "باشگاه مورد نظر یافت نشد",
        status: "ERROR",
      };
    }
  } catch (err) {
    return {
      message: "باشگاه مورد نظر یافت نشد",
      status: "ERROR",
    };
  }
};

const UsersCount = async () => {
  const usersCount = await User.countDocuments();
  return usersCount;
};

const getAllClubs = async (params) => {
  const usersCount = await UsersCount();
  const page = parseInt(params.page);
  const pageSize = parseInt(params.pageSize);

  const findUsers = await User.find({})
    .populate("user_favorite_events")
    .populate("club_events")
    .limit(pageSize)
    .skip(page === 1 ? 0 : (page - 1) * pageSize);
  const clubsList = findUsers.filter((item) => item.club_name);

  if (!clubsList) {
    return {
      message: "مشکلی رخ داده است.",
      status: "ERROR",
    };
  } else {
    return { status: "SUCCESS", data: clubsList, count: usersCount };
  }
};

const getMessages = async (params) => {
  const userId = params.userId;
  const resetCount = params.resetCount;
  const findUser = await User.findById(userId)
    .select({ messages: 1 })
    .sort({ created: -1 })
    .populate({
      path: "messages",
      populate: [
        {
          path: "event",
          populate: [
            {
              path: "event_owner",
              select: { club_name: 1, user_avatar: 1 },
            },
          ],
          select: { event_title: 1, eventBanner: 1 },
        },
        {
          path: "cours",
          populate: {
            path: "cours_owner",
            select: { club_name: 1, user_avatar: 1 },
          },
          select: { cours_title: 1, coursBanner: 1 },
        },
      ],
    });

  var userQuery = { messages: { $elemMatch: { read: false } } };
  var userNewvalues = {
    $set: { "messages.$.read": "true" },
  };

  resetCount && (await User.updateOne(userQuery, userNewvalues));

  if (!findUser) {
    return {
      message: "مشکلی رخ داده است.",
      status: "ERROR",
    };
  } else {
    return { status: "SUCCESS", data: findUser };
  }
};

const clubProvienceFilter = async ({ selectState }) => {
  const findUsers = await User.find({ user_state: selectState })
    .populate("user_favorite_events")
    .populate("club_events");
  // .limit(pageSize)
  // .skip(page === 1 ? 0 : (page - 1) * pageSize);
  const clubsList = findUsers.filter((item) => item.club_name);
  if (!clubsList) {
    return {
      message: "مشکلی رخ داده است.",
      status: "ERROR",
    };
  } else {
    return { status: "SUCCESS", data: clubsList };
  }
};

const getAllUsers = async (params) => {
  const usersCount = await UsersCount();
  const page = parseInt(params.page);
  const pageSize = parseInt(params.pageSize);

  const findUsers = await User.find(
    {},
    {
      mobile: 1,
      club_name: 1,
      last_name: 1,
      user_email: 1,
      first_name: 1,
      national_id: 1,
      date_of_birth: 1,
      emergency_tell: 1,
    }
  )
    .limit(pageSize)
    .skip(page === 1 ? 0 : (page - 1) * pageSize);
  const usersList = findUsers.filter((item) => !item.club_name);
  if (!usersList) {
    return {
      message: "مشکلی رخ داده است.",
      status: "ERROR",
    };
  } else {
    return { status: "SUCCESS", data: usersList, count: usersCount };
  }
};

const updateUserData = async ({ _id, updatedItem }) => {
  const findUser = await User.findOne({ _id });
  if (!findUser) {
    return {
      message: "حساب کاربری پیدا نشد.",
      status: "ERROR",
    };
  } else {
    var myquery = { _id: findUser._id };
    var newvalues = { $set: { ...updatedItem } };
    await User.updateOne(myquery, newvalues);

    return { status: "SUCCESS", message: "اطلاعات شما به روز رسانی شد" };
  }
};

const addToFavoriteEvents = async ({ mobile, event_id }) => {
  const findUser = await User.findOne({ mobile });

  if (!findUser) {
    return {
      message: "حساب کاربری پیدا نشد.",
      status: "ERROR",
    };
  } else {
    if (
      findUser.user_favorite_events
        .map((item) => item.toString())
        .find((item) => item == event_id)
    ) {
      findUser.user_favorite_events.pull(event_id);
      await findUser.save();
      return {
        status: "error",
        message: "از لیست علاقه مندی های شما با موفقیت حذف شد",
        data: false,
      };
    } else {
      findUser.user_favorite_events.push(event_id);
      await findUser.save();

      return {
        status: "success",
        message: "به لیست علاقه مندی های شما اضافه شد",
        data: true,
      };
    }
  }
};

const addToFavoriteClubs = async ({ mobile, club_id }) => {
  const findUser = await User.findOne({ mobile });

  if (!findUser) {
    return {
      message: "حساب کاربری پیدا نشد.",
      status: "ERROR",
    };
  } else {
    if (
      findUser.user_favorite_clubs
        .map((item) => item.toString())
        .find((item) => item == club_id)
    ) {
      findUser.user_favorite_clubs.pull(club_id);
      await findUser.save();
      return {
        status: "error",
        message: "از لیست علاقه مندی های شما با موفقیت حذف شد",
        data: false,
      };
    } else {
      findUser.user_favorite_clubs.push(club_id);
      await findUser.save();

      return {
        status: "success",
        message: "به لیست علاقه مندی های شما اضافه شد",
        data: true,
      };
    }
  }
};

const updateUserLogo = async (params) => {
  const { imageName, _id } = params;
  const findUser = await User.findOne({ _id });
  const newUser = await User.findOneAndUpdate(
    { _id },
    { user_avatar: imageName },
    { new: true }
  );
  return { newUser, status: 200 };
};

const updateClubBanner = async (params) => {
  const { imageName, _id } = params;

  const findUser = await User.findOne({ _id });
  const pastLogo = findUser.club_banner;

  if (!pastLogo) {
    const newUser = await User.findOneAndUpdate(
      { _id },
      { club_banner: imageName },
      { new: true }
    );
    return { newUser, status: 200 };
  } else {
    const filter = { _id };
    const update = { club_banner: imageName };
    const newUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    return { newUser, status: 200 };
  }
};

const getUserId = async (value) => {
  const userId = (await User.findOne(value))._id;

  return userId;
};

module.exports = {
  CheckKYC,
  KycResult,
  getUserId,
  CreateUser,
  getMessages,
  GetUserInfo,
  getAllClubs,
  getAllUsers,
  getClubInfo,
  GetUserRole,
  updateUserLogo,
  updateUserData,
  CheckUserExist,
  CreateRandomKey,
  updateClubBanner,
  addToFavoriteClubs,
  UserAuthentication,
  addToFavoriteEvents,
  clubProvienceFilter,
};
