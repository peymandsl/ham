import React from "react";
import { Empty } from "antd";
import ClubEvents from "./ClubEvents";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ClubInfo from "../clubViewOne/ClubInfo";

export default function ClubRightDetailes({ club }) {
  return (
    <Box style={{ marginLeft: "15px" }}>
      <Paper elevation={0}>
        <Box
          style={{ borderRadius: "10px" }}
          component="img"
          sx={{
            height: "400px",
            width: "100%",
          }}
          alt="club banner."
          src={
            club.club_banner
              ? `/uploads/club_banners/${club.club_banner}`
              : "/uploads/club_banners/1.jpg"
          }
        />
        <ClubInfo club={club} />
        <Divider variant="middle" />

        <Divider variant="middle" />
        <Typography style={{ margin: "15px 0px " }} variant="h6">
          برنامه ها
        </Typography>
        {club.club_events?.length > 0 ? (
          <ClubEvents ClubEvents={club.club_events} />
        ) : (
          <Empty description="هنوز برنامه ای ایجاد نشده است" />
        )}
      </Paper>
    </Box>
  );
}
