import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

const CheckboxList = [
  { id: 1, name: "بیمه مسولیت", label: "بیمه مسولیت" },
  { id: 2, name: "راهنمای تور", label: "راهنمای تور" },
  { id: 8, name: "راهنمای محلی", label: "راهنمای محلی" },
  { id: 9, name: "مجوز برگزرای", label: "مجوز برگزرای" },
  { id: 10, name: "صبحانه سلف سرویس", label: "صبحانه سلف سرویس" },
  { id: 11, name: "نهار سلف سرویس", label: "نهار سلف سرویس" },
  { id: 12, name: "شام سلف سرویس", label: "شام سلف سرویس" },
  { id: 13, name: "میان وعده", label: "میان وعده" },
];

export default function ClubServicesList({
  setSubmitEventData,
  clubServices,
  setClubServices,
}) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (event) => {
    setClubServices((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  // useEffect(() => {
  //   setSubmitEventData(clubServices);
  // }, [clubServices]);

  return (
    <FormGroup>
      <Grid container>
        {CheckboxList.map((item) => (
          <Grid item key={item.id} xs={6} sm={6} md={3} lg={4}>
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  name={item.name}
                  checked={clubServices[item.name] || false}
                  onChange={handleChange}
                  {...label}
                  color="error"
                />
              }
              label={item.label}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
}
