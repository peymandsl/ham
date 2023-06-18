import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function EventAttending({
  setSubmitEventData,
  setDisableBtn,
  editEvent,
}) {
  const [eventAttending, setEventAttending] = useState({});

  const onchangeHanlder = (event) => {
    setEventAttending((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (eventAttending.enterance_rules) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData({
      ...eventAttending,
    });
  }, [eventAttending]);

  useEffect(() => {
    editEvent
      ? setEventAttending({ enterance_rules: editEvent.enterance_rules })
      : setEventAttending({});
  }, [editEvent]);
  return (
    <Grid container>
      <Grid
        style={{ paddingBottom: "25px" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid item>
          <Typography variant="h6">شرایط شرکت در برنامه</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            name="enterance_rules"
            onChange={onchangeHanlder}
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={eventAttending.enterance_rules}
            placeholder="قوانین و شرایط حضور در برنامه "
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
