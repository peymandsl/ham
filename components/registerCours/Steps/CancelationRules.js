import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function CancelationRules({
  setSubmitCoursData,
  setDisableBtn,
  editCours,
}) {
  const [eventCancellation, setEventCancellation] = useState({});

  const onchangeHanlder = (event) => {
    setEventCancellation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (eventCancellation.cancellation_rules) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitCoursData({
      ...eventCancellation,
    });
  }, [eventCancellation]);

  useEffect(() => {
    editCours
      ? setEventCancellation({
          cancellation_rules: editCours.cancellation_rules,
        })
      : setEventCancellation({});
  }, [editCours]);
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
          <Typography variant="h6">شرایط لغو ثبت نام</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            name="cancellation_rules"
            value={eventCancellation.cancellation_rules}
            onChange={onchangeHanlder}
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="قوانین و شرایط لغو "
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
