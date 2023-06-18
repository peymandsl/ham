import React from "react";
import { Grid } from "@mui/material";

import LastSecondEvents from "../lastSecondEvents";
import SearchField from "../searchField";
import FastSearch from "../fastSearchSlider";
import LearningEvents from "../learningEvents";
import DiffrentEventsSlider from "../provinceEventsSlider";

const HomeLandingPage = () => {
  return (
    <div style={{ position: "absolute", top: "0px", right: "0px" }}>
      <SearchField />
      <Grid container style={{ width: "98.9vw" }} justifyContent="center">
        <DiffrentEventsSlider />
        <FastSearch />
        <LastSecondEvents />
        <LearningEvents />
      </Grid>
    </div>
  );
};

export default HomeLandingPage;
