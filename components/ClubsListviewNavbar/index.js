import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import ClubProvienceFilter from "../ClubsListviewNavbar/ClubProvienceFilter";

function ClubsListviewNavbar() {
  return (
    <Box style={{ position: "fixed", zIndex: "1" }} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#D2001A", height: "52px" }}
      >
        <Toolbar
          style={{ minHeight: "50px", width: "100vw", overflow: "auto" }}
        >
          <ClubProvienceFilter title=" استان ها" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ClubsListviewNavbar;
