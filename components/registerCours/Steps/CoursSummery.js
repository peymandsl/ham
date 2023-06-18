import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function CoursSummery({
  setSubmitCoursData,
  setDisableBtn,
  editCours,
}) {
  const [coursSummery, setCoursSummery] = useState({});

  const onchangeHanlder = (event) => {
    setCoursSummery((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (coursSummery.cours_summery) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitCoursData(coursSummery);
  }, [coursSummery]);

  useEffect(() => {
    editCours
      ? setCoursSummery({
          cours_summery: editCours.cours_summery,
          cours_summery_continue: editCours.cours_summery_continue,
        })
      : setCoursSummery({});
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
          <Typography variant="h6">معرفی دوره</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            value={coursSummery.cours_summery}
            fullWidth
            name="cours_summery"
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="جزییات دوره "
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
          <Typography variant="h6">جزییات دوره (ادامه مطلب)</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            value={coursSummery.cours_summery_continue}
            name="cours_summery_continue"
            onChange={onchangeHanlder}
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={6}
            placeholder="جزییات دوره(این قسمت در ادامه مطلب نشان داده می شود)."
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
