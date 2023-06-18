import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

import stayingLocations from "../../../public/stayingLocation.json";

export default function StayingLocation({
  setSubmitCoursData,
  setDisableBtn,
  editCours,
}) {
  const [stayingLocation, setStayingLocation] = useState({});
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const onchangeHanlder = (event) => {
    setStayingLocation((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    editCours
      ? setStayingLocation(editCours.stayingLocation)
      : setStayingLocation({});
  }, [editCours]);

  useEffect(() => {
    if (Object.keys(stayingLocation).length !== 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitCoursData({
      stayingLocation,
    });
  }, [stayingLocation]);

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">اطلاعات محل اقامت</Typography>
      </Grid>
      <FormGroup>
        <Grid container>
          {stayingLocations.map((item) => (
            <Grid item key={item.id} xs={6} sm={6} md={3} lg={4}>
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    name={item.name}
                    checked={stayingLocation[item.name] || false}
                    onChange={onchangeHanlder}
                    color="error"
                    {...label}
                  />
                }
                label={item.label}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
}
