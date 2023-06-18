import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function EventSummery({
  setSubmitEventData,
  setDisableBtn,
  editEvent,
}) {
  const [eventSummery, setEventSummery] = useState({});

  const onchangeHanlder = (event) => {
    setEventSummery((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    editEvent
      ? setEventSummery({
          event_summery: editEvent.event_summery,
          event_summery_continue: editEvent.event_summery_continue,
        })
      : setEventSummery({});
  }, [editEvent]);

  useEffect(() => {
    if (eventSummery.event_summery) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData({ ...eventSummery });
  }, [eventSummery]);

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
          <Typography variant="h6">خلاصه ای درمورد برنامه</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            value={eventSummery.event_summery}
            fullWidth
            name="event_summery"
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="خلاصه ای درباره برنامه "
            onChange={onchangeHanlder}
          />
        </Grid>
      </Grid>
      <Grid
        style={{ paddingBottom: "25px" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid item>
          <Typography variant="h6">جزییات برنامه (ادامه مطلب)</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            value={eventSummery.event_summery_continue}
            name="event_summery_continue"
            onChange={onchangeHanlder}
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={6}
            placeholder="جزییات برنامه(این قسمت در ادامه مطلب نشان داده می شود)."
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
