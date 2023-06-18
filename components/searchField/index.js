import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function SearchField() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "90vh",
        backgroundImage: `url("/assets/HomeImage.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        style={{
          // backgroundImage: `url("/assets/HomeImage.jpg")`,
          padding: "0px 10px 0px 0px",
          borderRadius: "25px",
          zIndex: 1,
          height: "41px",
        }}
      >
        {/* <div style={{ zIndex: "-1" }}>
          <Image src="/assets/HomeImage.jpg" alt="home image" fill />
        </div> */}
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="کجا میخوای بری؟" />
        <IconButton
          style={{ marginLeft: "4px", padding: "6px", backgroundColor: "gold" }}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}
