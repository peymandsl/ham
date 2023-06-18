import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { logInOrRegister } from "../redux/features/userSlice";
import LeftDetailesSkeleton from "./LeftDetailesSkeleton";
import { useSession } from "next-auth/react";
import { Col, Row } from "antd";

import axios from "axios";
import PN from "persian-number";
import { Skeleton } from "antd";
import { FaBus } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsClock } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { SiCodeclimate } from "react-icons/si";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function LeftDetailes({
  setRegisterStep,
  registerStep,
  userData,
  cours,
  event,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const role = useSelector((state) => state.userInfo.userRole);
  const [eventStatus, setEventStatus] = useState(false);
  const [coursStatus, setCoursStatus] = useState(false);
  const { data } = useSession();
  console.log(event, "event");
  useEffect(() => {
    setEventStatus(Object.keys(event).length > 0);
    setCoursStatus(Object.keys(cours).length > 0);
  }, [event, cours]);
  const CustomToastWithLink = () => (
    <div>لطفا اطلاعات خود را از قسمت حساب کاربری تکمیل فرمایید</div>
  );
  const {
    _id,
    mobile,
    last_name,
    club_name,
    first_name,
    user_email,
    national_id,
    user_gender,
    emergency_tell,
  } = userData;
  const stepHandler = () => {
    if (club_name) {
      setRegisterStep("3");
    } else if (
      mobile &&
      last_name &&
      first_name &&
      user_email &&
      national_id &&
      user_gender &&
      emergency_tell
    ) {
      setRegisterStep("2");
    } else {
      dispatch(logInOrRegister(true));
    }
  };
  const backToEvent = () => {
    setRegisterStep("1");
  };

  const handleCancellEvent = () => {
    axios
      .post("/api/events/eventStatus", {
        _id: event?._id,
        event_status: "cancell",
      })
      .then((res) => {
        if (res.status == 604) {
          toast.warning("خطایی رخ داده است");
        } else {
          if (res.data.status == "SUCCESS") {
            toast.success("برنامه شما لغو گردید");
          }
        }
      });
  };

  const handleCancellCours = () => {
    axios
      .post("/api/courses/coursStatus", {
        _id: cours?._id,
        cours_status: "cancell",
      })
      .then((res) => {
        if (res.status == 604) {
          toast.warning("خطایی رخ داده است");
        } else {
          if (res.data.status == "SUCCESS") {
            toast.success("دوره شما لغو گردید");
          }
        }
      });
  };

  const eventMembersRemain =
    eventStatus && +event?.event_capacity - event?.event_participants?.length;
  const coursMembersRemain =
    coursStatus && +cours?.cours_capacity - cours?.cours_participants?.length;
  return (
    <Box style={{ position: "sticky", top: "80px" }}>
      <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={3}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {!eventStatus && !coursStatus ? (
              <Skeleton.Avatar active size="large" shape="circle" />
            ) : (
              <Avatar
                alt="Event Logo"
                src={
                  eventStatus
                    ? `/uploads/avatars/${event?.event_owner?.user_avatar}`
                    : coursStatus
                    ? `/uploads/avatars/${cours?.cours_owner?.user_avatar}`
                    : `https://secure.gravatar.com/avatar/${_id}?s=90&d=identicon`
                }
                sx={{ width: 56, height: 56 }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {!eventStatus && !coursStatus && (
              <Skeleton.Input active size="small" />
            )}
            {eventStatus && (
              <Typography variant="h6">
                باشگاه{" "}
                {eventStatus
                  ? event.event_owner?.club_name
                  : cours?.cours_owner?.club_name}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid
          container
          justifyContent="space-around"
          style={{
            color: "#fff",
            padding: "5px",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "5px",
            marginBottom: "20px",
            backgroundColor: "rgb(64, 64, 64)",
          }}
        >
          {!eventStatus && !coursStatus ? (
            <Grid
              container
              style={{ padding: "10px" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Skeleton.Input active size="small" />
              </Grid>
              <Grid item>
                <Skeleton.Input active size="small" />
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid item>
                <Typography variant="h6">هزینه هر نفر:</Typography>
              </Grid>
              <Grid>
                <Typography variant="h6">
                  {eventStatus ? (
                    <>{(+event.event_price).toLocaleString("fa-IR")}تومان</>
                  ) : (
                    <>{(+cours.cours_price).toLocaleString("fa-IR")}تومان</>
                  )}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
        {!eventStatus && !coursStatus ? (
          <LeftDetailesSkeleton />
        ) : (
          <>
            <Grid
              container
              style={{ marginBottom: "20px" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="body1">
                  <SiCodeclimate /> نوع برنامه:{" "}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  {eventStatus ? event.event_type : cours.cours_type}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ marginBottom: "20px" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Grid item>
                  <Typography variant="body1">
                    <HiOutlineLocationMarker style={{ fontSize: "18px" }} /> محل
                    حرکت:
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <Typography variant="body1">
                  {eventStatus ? event.selectState : cours.selectState}
                </Typography>{" "}
                -
                <Typography variant="body1">
                  {eventStatus ? event.selectCity : cours.selectCity}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ marginBottom: "20px" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="body1">
                  <BsClock /> زمان اجرا:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {eventStatus ? event.startEventDate : cours.startEventDate}
                </Typography>
              </Grid>
            </Grid>
            {eventStatus && (
              <Grid
                container
                style={{ marginBottom: "20px" }}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="body1">
                    <FaBus />
                    وسیله نقلیه:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {event.transfer_type}{" "}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid
              container
              style={{ marginBottom: "20px" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="body1">
                  <GiSandsOfTime /> مهلت ثبت نام:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {eventStatus
                    ? event?.register_deadline
                    : cours?.register_deadline}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: "20px" }}
            >
              <Grid item>
                <Typography variant="body1">
                  <BsPeopleFill /> ظرفیت باقی مانده
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {PN.convertEnToPe(
                    eventMembersRemain ? eventMembersRemain : coursMembersRemain
                  )}
                  نفر
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {!eventStatus && !coursStatus ? (
          <Grid
            container
            style={{ padding: "10px", width: "100%" }}
            justifyContent="center"
            direction="column"
          >
            <Grid item>
              <Skeleton.Input block active size="default" />
            </Grid>
            <Grid item>
              <Skeleton.Input block active size="default" />
            </Grid>
            <Grid item>
              <Skeleton.Input block active size="default" />
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="column">
            {registerStep !== "3" ? (
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    className="btn btn-anim"
                    onClick={stepHandler}
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      cursor: "pointer",
                      fontWeight: "600",
                      color: "rgb(64, 64, 64)",
                      backgroundColor: "rgb(240, 200, 7)",
                    }}
                  >
                    {club_name ? " مشاهده لیست ثبت نام " : "ثبت نام"}
                  </Button>
                </Grid>
                {role !== "user" && (
                  <Grid item>
                    <Button
                      className="btn btn-anim"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={() => {
                        eventStatus
                          ? router.push(`/events/editEvent/${event?._id}`)
                          : router.push(`/courses/editCours/${cours?._id}`);
                      }}
                      style={{
                        width: "100%",
                        fontSize: "15px",
                        cursor: "pointer",
                        fontWeight: "600",
                        color: "rgb(64, 64, 64)",
                        backgroundColor: "rgb(240, 200, 7)",
                      }}
                    >
                      ویرایش برنامه
                    </Button>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Grid item>
                <Button
                  fullWidth
                  size="large"
                  className="btn btn-anim"
                  variant="contained"
                  onClick={backToEvent}
                  style={{
                    width: "100%",
                    fontSize: "15px",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "rgb(64, 64, 64)",
                    backgroundColor: "rgb(240, 200, 7)",
                  }}
                >
                  {"مشاهده برنامه"}
                </Button>
              </Grid>
            )}
            {role !== "user" && (
              <Grid item style={{ paddingTop: "8px" }}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={
                    eventStatus
                      ? event.event_status == "cancell"
                      : cours.cours_status == "cancell"
                  }
                  onClick={
                    eventStatus ? handleCancellEvent : handleCancellCours
                  }
                  className="btn btn-anim"
                  style={{
                    width: "100%",
                    fontSize: "15px",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "rgb(64, 64, 64)",
                    backgroundColor: "rgb(240, 200, 7)",
                  }}
                >
                  {"لغو برنامه"}
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
