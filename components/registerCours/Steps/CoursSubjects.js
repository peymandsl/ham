import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CoursSubjectsField from "./CoursSubjectsField";

export default function CoursSubjects({ setSubmitCoursData, setDisableBtn }) {
  const [coursSubjects, setCoursSubjects] = useState([]);

  useEffect(() => {
    setSubmitCoursData({
      coursSubjects,
    });
  }, [coursSubjects]);

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">سرفصل های دوره</Typography>
      </Grid>
      <Grid container>
        <CoursSubjectsField
          coursSubjects={coursSubjects}
          setCoursSubjects={setCoursSubjects}
          setDisableBtn={setDisableBtn}
        />
      </Grid>
    </Grid>
  );
}
