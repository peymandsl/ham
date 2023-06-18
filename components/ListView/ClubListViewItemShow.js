import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ClubTypes from "../clubViewOne/ClubTypes";
import Typography from "@mui/material/Typography";

import { HiOutlineLocationMarker } from "react-icons/hi";

export default function ClubListViewItemShow({ clubDataShow }) {
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
    club_event_types,
  } = clubDataShow;
  return (
    <Box>
      <Paper style={{ padding: "5px" }} elevation={3}>
        <Grid container>
          <Grid style={{ marginLeft: "6px" }} item>
            <Avatar
              alt="Club Logo"
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
              alt="Item Banner"
              style={{
                color: "white",
                paddingTop: "5px",
                margin: "auto",
                width: "100%",
                height: "100%",
              }}
            />
          </Grid>
          <Grid container>
            <Grid container>
              <Typography style={{ fontSize: "14px" }}>
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
        </Grid>
        <Button
          size="large"
          fullWidth
          variant="contained"
          href={`/clubs/${_id}`}
          style={{ fontSize: "18px", backgroundColor: "#D2001A" }}
        >
          مـشـاهـده باشگاه
        </Button>{" "}
      </Paper>
    </Box>
  );
}
