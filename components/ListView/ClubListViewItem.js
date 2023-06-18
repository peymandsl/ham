import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function ClubListViewItem({ item, setSelectedClub }) {
  const {
    _id,
    logo,
    club_name,
    last_name,
    first_name,
    user_state,
    user_avatar,
    club_events,
    club_banner,
    user_gender,
  } = item;
  const [favIcon, setFavIcon] = useState(false);
  const userData = useSelector((state) => state.userInfo.userData);
  useEffect(() => {
    userData.user_favorite_clubs &&
      setFavIcon(
        userData.user_favorite_clubs.map((item) => item._id).includes(_id)
      );
  }, [_id, userData]);

  const selectEventHandler = () => {
    setSelectedClub(_id);
  };

  const addToFavorite = () => {
    axios
      .post("/api/clubs/addToFavoriteClubs", {
        mobile: userData.mobile,
        club_id: _id,
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
    <Box onClick={selectEventHandler} style={{ cursor: "pointer" }} key={_id}>
      <Paper style={{ padding: "5px" }} elevation={3}>
        <Grid container>
          <Grid style={{ marginLeft: "6px" }} item>
            <Avatar
              alt="User Logo"
              src={
                user_avatar
                  ? `uploads/avatars/${user_avatar}`
                  : `https://secure.gravatar.com/avatar/${_id}?s=90&d=identicon`
              }
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item>
            <Typography> باشگاه {club_name}</Typography>
            <Typography style={{ fontSize: "14px" }}>
              {` ${
                user_gender == "مرد" ? "آقای" : "خانم"
              } ${first_name} ${last_name}`}
            </Typography>
          </Grid>
          <Grid container>
            <Image
              width={300}
              height={200}
              src={
                club_banner
                  ? `/uploads/club_banners/${club_banner}`
                  : "/uploads/club_banners/1.jpg"
              }
              alt="Event Banner"
              style={{
                color: "white",
                paddingTop: "5px",
                width: "100%",
                height: "100%",
              }}
            />
          </Grid>
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
                background: "#fff",
                borderRadius: "5px",
                position: "absolute",
                margin: "0px 35px 0 0 ",
              }}
            >
              {!favIcon ? (
                <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon style={{ color: "#D2001A" }} />
              )}
            </IconButton>
          </div>

          <Grid container>
            <Typography style={{ fontSize: "18px" }}>
              <HiOutlineLocationMarker />
            </Typography>
            <Typography style={{ fontSize: "14px" }}>{user_state}</Typography>
          </Grid>
          <Grid container>
            <Typography style={{ fontSize: "14px" }}>
              تعداد برنامه ها:
            </Typography>
            <Typography style={{ fontSize: "14px" }}>
              {club_events?.length.toLocaleString("fa-IR")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
