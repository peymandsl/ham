import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import BreadNav from "../../components/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import BirthDate from "../../components/profileEditItem/BirthDate";
import { getUserInfo } from "../../components/redux/features/userSlice";
import InputTextArea from "../../components/profileEditItem/InputTextArea";
import InputProvience from "../../components/profileEditItem/InputProvience";
import ProfileUploadImage from "../../components/profileEditItem/ProfileUploadImage";
import ProfileEditInputText from "../../components/profileEditItem/ProfileEditInputText";
import ProfileInputCheckbox from "../../components/profileEditItem/ProfileInputCheckbox";
import ProfileEditInputRadio from "../../components/profileEditItem/ProfileEditInputRadio";

function Profile({ userId }) {
  const [updatedItem, setUpdatedItem] = useState({});
  const userData = useSelector((state) => state.userInfo.userData);
  const dispatch = useDispatch();
  const router = useRouter();

  const profileId = router.query.profileId ? router.query.profileId : userId;
  useEffect(() => {
    setUpdatedItem(userData);
  }, [userData]);

  const onchangeHanlder = (event) => {
    setUpdatedItem({ [event.target.name]: event.target.value });
  };

  return (
    <Box>
      <Paper elevation={0}>
        <Grid container direction="column">
          <Grid item>
            <BreadNav
              items={[{ href: "/", title: "خانه" }, { title: "پروفایل" }]}
            />{" "}
          </Grid>
          <Grid
            container
            style={{ width: "72%", margin: "auto", paddingTop: "15px" }}
            // justifyContent="center"
            // spacing={6}
          >
            <ProfileEditInputText
              title="نام "
              textFieldID="first_name"
              name="first_name"
              value={updatedItem.first_name}
              onchangeHanlder={onchangeHanlder}
              placeholder="پیمان "
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputText
              title=" نام خانوادگی"
              textFieldID="last_name"
              name="last_name"
              value={updatedItem.last_name}
              onchangeHanlder={onchangeHanlder}
              placeholder=" بحرینی"
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputText
              title=" نام پدر"
              textFieldID="father_name"
              name="father_name"
              value={updatedItem.father_name}
              onchangeHanlder={onchangeHanlder}
              placeholder="حیدر"
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputText
              title="کد ملی"
              textFieldID="national_id"
              placeholder="0012233445"
              name="national_id"
              value={updatedItem.national_id}
              onchangeHanlder={onchangeHanlder}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <BirthDate
              disabled={true}
              title="تاریخ تولد"
              name="date_of_birth"
              profileId={profileId}
              placeholder="0012233445"
              updatedItem={updatedItem}
              textFieldID="date_of_birth"
              value={updatedItem.date_of_birth}
              onchangeHanlder={onchangeHanlder}
            />
            <InputProvience
              editable
              title="محل اقامت"
              textFieldID="user_provience"
              placeholder="تهران"
              name="user_provience"
              value={updatedItem.user_provience}
              onchangeHanlder={onchangeHanlder}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileUploadImage
              editable
              title="تصویر پروفایل"
              textFieldID="user_avatar"
              name="user_avatar"
              imageApi="updateLogo"
              submitURL="/uploadAvatar"
              profileId={profileId}
            />
            <ProfileEditInputText
              title="شماره موبایل"
              textFieldID="mobile"
              placeholder="09173735746"
              name="mobile"
              value={updatedItem.mobile}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputText
              editable
              title="شماره اضطراری"
              textFieldID="phone"
              placeholder="0773532"
              name="emergency_tell"
              value={updatedItem.emergency_tell}
              onchangeHanlder={onchangeHanlder}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputText
              editable
              title="آدرس ایمیل"
              textFieldID="email"
              placeholder="peyma@gmai.com"
              name="user_email"
              value={updatedItem.user_email}
              onchangeHanlder={onchangeHanlder}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputRadio
              title="جنسیت"
              textFieldID="user_gender"
              placeholder="male"
              name="user_gender"
              value={updatedItem.user_gender ? userData.user_gender : "مرد"}
              onchangeHanlder={onchangeHanlder}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <ProfileEditInputText
              editable
              title="نام باشگاه"
              textFieldID="club_name"
              placeholder="باشگاه همنورد"
              tooltipIcon={<ErrorTwoToneIcon />}
              tooltipTitle="در صورتی که مدیر باشگاه هستید، این قسمت را تکمیل کنید"
              name="club_name"
              value={updatedItem.club_name}
              onchangeHanlder={onchangeHanlder}
              tootipStyle={{
                padding: "0 10px",
                color: "#FF5403",
                backgroundColor: "transparent",
              }}
              updatedItem={updatedItem}
              profileId={profileId}
            />
            <Fade in={userData.club_name ? true : false}>
              <Paper
                style={{
                  boxShadow: "none !important",
                  width: "100%",
                  display: "contents",
                }}
              >
                <InputTextArea
                  editable
                  title="معرفی باشگاه"
                  textFieldID="club_description"
                  placeholder="اطلاعات و مشخصات باشگاه مانند سال تاسیس، شماره مجوز، سرپرستان و کادر باشگاه و غیره"
                  name="club_description"
                  value={updatedItem.club_description}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  show={true}
                  profileId={profileId}
                />
                <ProfileInputCheckbox
                  editable
                  title="رشته های فعالیت"
                  textFieldID="club_event_types"
                  name="club_event_types"
                  value={updatedItem.club_event_types}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  show={true}
                  profileId={profileId}
                />
                <ProfileEditInputText
                  editable
                  title="تاریخ تاسیس"
                  textFieldID="club_create_date"
                  placeholder="1400"
                  name="club_create_date"
                  value={updatedItem.club_create_date}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  profileId={profileId}
                />
                <ProfileEditInputText
                  editable
                  title="آدرس وب سایت باشگاه"
                  textFieldID="club_website"
                  placeholder="1400"
                  name="club_website"
                  value={updatedItem.club_website}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  profileId={profileId}
                />
                <ProfileEditInputText
                  editable
                  title="شماره مجوز باشگاه"
                  textFieldID="certificate_No"
                  placeholder="123456789"
                  name="certificate_No"
                  value={updatedItem.certificate_No}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  profileId={profileId}
                />
                <ProfileUploadImage
                  editable
                  title="تصویر بنر باشگاه"
                  textFieldID="club_banner"
                  name="club_banner"
                  imageApi="clubBanner"
                  submitURL="/uploadBanner"
                  profileId={profileId}
                />
                <ProfileEditInputText
                  editable
                  title="آدرس اینستاگرام"
                  tooltipIcon={<ErrorTwoToneIcon />}
                  tooltipTitle="لطفا آدرس اینستاگرام خود را وارد کنید"
                  textFieldID="insta_profile"
                  placeholder="username"
                  name="insta_profile"
                  value={updatedItem.insta_profile}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  tootipStyle={{
                    padding: "0 10px",
                    color: "#FF5403",
                    backgroundColor: "transparent",
                  }}
                  profileId={profileId}
                />
                <ProfileEditInputText
                  editable
                  title="آدرس تلگرام"
                  tooltipIcon={<ErrorTwoToneIcon />}
                  tooltipTitle="لطفا آدرس تلگرام خود را وارد کنید"
                  textFieldID="telegram_id"
                  placeholder="clubname"
                  name="telegram_id"
                  value={updatedItem.telegram_id}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  tootipStyle={{
                    padding: "0 10px",
                    color: "#FF5403",
                    backgroundColor: "transparent",
                  }}
                  profileId={profileId}
                />
                <ProfileEditInputText
                  editable
                  title="شماره واتساپ"
                  textFieldID="whatsapp_number"
                  placeholder="0912123123"
                  name="whatsapp_number"
                  value={updatedItem.whatsapp_number}
                  onchangeHanlder={onchangeHanlder}
                  updatedItem={updatedItem}
                  profileId={profileId}
                />
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = session?.token.restOfUser._id;

  const role = (
    await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
  ).data;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!userId) {
    return {
      props: {
        role: "user",
      },
    };
  } else {
    return {
      props: {
        session: session,
        role: role,
        userID: userId,
      },
    };
  }
}
