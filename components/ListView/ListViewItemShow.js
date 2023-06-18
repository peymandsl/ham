import React, { useState, useEffect } from "react";
import Image from "next/image";
import PN from "persian-number";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

export default function ListViewItemShow({ selectedEvent, width }) {
  const [expireEvent, setExpireEvent] = useState(false);
  const {
    _id,
    event_title,
    cours_title,
    event_owner,
    cours_owner,
    event_type,
    selectState,
    hard_ship,
    event_price,
    travel_days,
    last_second,
    peak_height,
    eventBanner,
    coursBanner,
    register_deadline,
    discount_percent,
    event_participants,
  } = selectedEvent;
  useEffect(() => {
    const date = new DateObject({
      calendar: persian,
      locale: persian_fa,
      date: register_deadline,
    }).convert();
    const oldDate = date.format();
    const newDate = new DateObject({ locale: persian_fa }).format();
    newDate > oldDate ? setExpireEvent(true) : setExpireEvent(false);
  }, [register_deadline]);

  return (
    <Box
      style={{
        position: width > 900 ? "fixed" : "static",
      }}
    >
      <Paper style={{ padding: "5px" }} elevation={3}>
        <Grid container>
          <Grid style={{ marginLeft: "6px" }} item>
            <Avatar
              alt="Club Logo"
              src={
                `/uploads/avatars/${
                  event_owner
                    ? event_owner.user_avatar
                    : cours_owner.user_avatar
                }` ||
                `https://secure.gravatar.com/avatar/${_id}?s=90&d=identicon`
              }
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item>
            <Typography>{event_title || cours_title}</Typography>
            <Typography style={{ fontSize: "14px" }}>{event_type}</Typography>
          </Grid>
          <Grid container>
            <Image
              width={300}
              height={200}
              src={
                eventBanner
                  ? `/uploads/event_banners/${eventBanner}`
                  : coursBanner
                  ? `/uploads/cours_banners/${coursBanner}`
                  : "/uploads/event_banners/1.jpg"
              }
              alt="Item Banner"
              style={{
                color: "white",
                paddingTop: "5px",
                margin: "auto",
                width: "100%",
                height: "100%",
                filter: `grayscale(${expireEvent ? 1 : 0})`,
              }}
            />
          </Grid>
          <div
            style={{
              position: "relative",
              display: "flex",
              top: "10px",
              left: "98%",
            }}
          >
            <div
              style={{
                position: "absolute",
                background: "rgba(60, 60, 60, 0.7)",
                borderRadius: "6px",
                padding: "8px 6px",
              }}
            >
              {last_second && (
                <Typography
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    padding: "0px 8px",
                    width: "max-content",
                    marginBottom: "4px",
                    // position: "absolute",
                    borderRadius: "12px",
                    background: "rgb(204, 0, 1)",
                    filter: `grayscale(${expireEvent ? 1 : 0})`,
                  }}
                >
                  <LocalOfferOutlinedIcon
                    style={{
                      top: "4px",
                      fontSize: "16px",
                      marginLeft: "3px",
                      position: "relative",
                    }}
                  />
                  رزرو فوری
                </Typography>
              )}
              {discount_percent && (
                <Typography
                  style={{
                    // top: "26px",
                    color: "black",
                    width: "108px",
                    fontSize: "14px",
                    marginBottom: "4px",
                    padding: "0px 8px",
                    fontFamily: "vanila",
                    // position: "absolute",
                    borderRadius: "12px",
                    background: "rgb(240, 200, 7)",
                    filter: `grayscale(${expireEvent ? 1 : 0})`,
                  }}
                >
                  <LocalOfferOutlinedIcon
                    style={{
                      top: "4px",
                      fontSize: "16px",
                      marginLeft: "3px",
                      position: "relative",
                    }}
                  />
                  {PN.convertEnToPe(discount_percent)}% تخفیف
                </Typography>
              )}
              {/* {role == "club" && (
                <Typography
                  style={{
                    // top: "50px",
                    color: "black",
                    width: "100px",
                    fontSize: "14px",
                    padding: "0px 8px",
                    marginBottom: "4px",
                    fontFamily: "vanila",
                    // position: "absolute",
                    width: "max-content",
                    borderRadius: "12px",
                    background: "whitesmoke",
                    filter: `grayscale(${expireEvent ? 1 : 0})`,
                  }}
                >
                  <FaStop
                    style={{
                      position: "relative",
                      marginLeft: "3px",
                      top: "2px",
                      color:
                        event_status == "confirm"
                          ? "#21BF73"
                          : event_status == "cancell"
                          ? "#FF1E1E"
                          : event_status == "suspend"
                          ? "#FFDE00"
                          : event_status == "waiting"
                          ? "#F77E21"
                          : "",
                    }}
                  />
                  {event_status == "confirm"
                    ? "تایید شده"
                    : event_status == "cancell"
                    ? "لغو شده"
                    : event_status == "suspend"
                    ? " تعلیق شده"
                    : event_status == "waiting"
                    ? "در انتظار تایید"
                    : "حذف شده"}
                </Typography>
                // </Grid>
              )} */}
            </div>
          </div>

          {/* {last_second && (
            <Typography
              style={{
                color: "#fff",
                fontSize: "14px",
                padding: "0px 8px",
                position: "absolute",
                borderRadius: "12px",
                margin: "70px 14px 0 0 ",
                background: "#D2001A",
              }}
            >
              <LocalOfferOutlinedIcon
                style={{
                  top: "4px",
                  fontSize: "16px",
                  marginLeft: "2px",
                  position: "relative",
                }}
              />
              رزرو فوری
            </Typography>
          )}
          {discount_percent && (
            <Typography
              style={{
                color: "black",
                fontSize: "14px",
                fontFamily: "vanila",
                padding: "0px 8px",
                position: "absolute",
                borderRadius: "12px",
                margin: "94px 14px 0 0 ",
                background: "rgb(240, 200, 7)",
              }}
            >
              {PN.convertEnToPe(discount_percent)}% تخفیف
            </Typography>
          )} */}

          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container style={{ padding: "5px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  <HiOutlineLocationMarker />
                </Typography>
                <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                  {selectState}
                </Typography>
              </Grid>
            </Grid>
            {peak_height && (
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid item style={{ padding: "5px" }}>
                  <Typography
                    style={{ fontSize: "14px", margin: "0 auto 0 8px" }}
                  >
                    ارتفاع قله {(+peak_height).toLocaleString("fa-IR")} متر
                  </Typography>
                </Grid>
              </Grid>
            )}
            {travel_days && (
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid item style={{ padding: "5px" }}>
                  <Typography
                    style={{ fontSize: "14px", margin: "0 auto 0 8px" }}
                  >
                    مدت برنامه {PN.convertEnToPe(travel_days)}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {hard_ship && (
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid container style={{ padding: "5px" }}>
                  <Typography style={{ fontSize: "14px" }}>
                    درجه سختی
                  </Typography>
                  <Typography style={{ fontSize: "14px" }}>
                    {hard_ship.toLocaleString("fa-IR")} از {PN.convertEnToPe(5)}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {register_deadline && (
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid item style={{ padding: "5px" }}>
                  <Typography style={{ fontSize: "14px" }}>
                    مهلت ثبت نام: {register_deadline}{" "}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {event_price && (
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid item style={{ padding: "5px" }}>
                  <Typography style={{ fontSize: "14px", marginLeft: "22px" }}>
                    {(+event_price).toLocaleString("fa-IR")}
                    تومان
                  </Typography>
                </Grid>
              </Grid>
            )}
            {event_participants && (
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid item style={{ padding: "5px" }}>
                  <Typography
                    style={{ fontSize: "14px", margin: "0 auto 0 8px" }}
                  >
                    تعداد شرکت کننده ها{" "}
                    {PN.convertEnToPe(event_participants?.length)} نفر
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Button
          disabled={expireEvent}
          size="large"
          fullWidth
          variant="contained"
          href={cours_title ? `/courses/${_id}` : `/events/${_id}`}
          style={{ fontSize: "18px", backgroundColor: "#D2001A" }}
        >
          {expireEvent
            ? "مهلت ثبت نام پایان یافته"
            : cours_title
            ? "مـشـاهـده دوره"
            : "مـشـاهـده بـرنامـه"}
        </Button>{" "}
      </Paper>
    </Box>
  );
}
