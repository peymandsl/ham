import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import PN from "persian-number";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import DateObject from "react-date-object";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";

export default function ListViewItem({ item, setSelectedEvent }) {
  const {
    _id,
    hard_ship,
    event_type,
    cours_type,
    selectState,
    event_title,
    cours_title,
    event_price,
    cours_price,
    last_second,
    eventBanner,
    cours_owner,
    event_owner,
    coursBanner,
    event_status,
    startEventDate,
    discount_percent,
    register_deadline,
  } = item;
  const [favIcon, setFavIcon] = useState(false);
  const [expireEvent, setExpireEvent] = useState(false);
  const userData = useSelector((state) => state.userInfo.userData);
  const { data, status } = useSession();
  const userId = data?.token?.restOfUser?._id;
  const role = useSelector((state) => state.userInfo.userRole);

  useEffect(() => {
    userData.user_favorite_events &&
      setFavIcon(
        userData.user_favorite_events.map((item) => item._id).includes(_id)
      );
  }, [item]);

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

  const selectEventHandler = () => {
    setSelectedEvent && setSelectedEvent(_id);
  };

  const addToFavorite = () => {
    axios
      .post("/api/events/addToFavorite", {
        mobile: userData.mobile,
        event_id: _id,
      })
      .then((res) => {
        setFavIcon(res.data.data);
        if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      });
  };

  return (
    <Box
      onClick={selectEventHandler}
      style={{
        cursor: setSelectedEvent ? "pointer" : "",
      }}
      key={_id}
    >
      <Paper style={{ padding: "5px" }} elevation={3}>
        <Grid container>
          <Grid style={{ marginLeft: "6px" }} item>
            <Avatar
              alt="User Logo"
              src={
                event_owner
                  ? `/uploads/avatars/${event_owner.user_avatar}`
                  : cours_owner
                  ? `/uploads/avatars/${cours_owner.user_avatar}`
                  : `https://secure.gravatar.com/avatar/${_id}?s=90&d=identicon`
              }
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Link href={event_title ? `/events/${_id}` : `/courses/${_id}`}>
            <Grid item>
              <Typography>{event_title ? event_title : cours_title}</Typography>
              <Typography style={{ fontSize: "14px" }}>
                {event_type ? event_type : cours_type}
              </Typography>
            </Grid>
          </Link>
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
              alt="Event Banner"
              style={{
                color: "white",
                paddingTop: "5px",
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
              top: "100px",
              left: "75%",
            }}
          >
            {expireEvent && (
              <Typography
                style={{
                  color: "#fff",
                  opacity: "0.6",
                  rotate: "330deg",
                  fontSize: "34px",
                  padding: "0px 8px",
                  borderRadius: "5px",
                  width: "max-content",
                  position: "absolute",
                  background: "#F90716",
                }}
              >
                پایان یافته
              </Typography>
            )}
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              top: "10px",
              left: "70px",
            }}
          >
            <IconButton
              color="primary"
              component="label"
              onClick={addToFavorite}
              aria-label="favorite item"
              style={{
                padding: "3px",
                color: "firebrick",
                borderRadius: "5px",
                position: "absolute",
                margin: "0px 35px 0 0 ",
                background: "rgb(0, 0, 0, 0.17)",
              }}
            >
              {!favIcon ? (
                <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon style={{ color: "#D2001A" }} />
              )}
            </IconButton>
          </div>
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
              {role == "club" && (
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
              )}
            </div>
          </div>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Typography style={{ fontSize: "14px" }}>
                <HiOutlineLocationMarker />
                {selectState}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Typography style={{ fontSize: "14px" }}>میزان سختی</Typography>{" "}
            <Typography style={{ fontSize: "14px" }}>
              {hard_ship.toLocaleString("fa-IR")} از {PN.convertEnToPe(5)}
            </Typography>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography style={{ fontSize: "14px", marginLeft: "22px" }}>
                {event_price
                  ? (+event_price).toLocaleString("fa-IR")
                  : (+cours_price).toLocaleString("fa-IR")}
                تومان
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: "14px" }}>
                {startEventDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
