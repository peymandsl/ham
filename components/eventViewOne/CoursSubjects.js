import React from "react";
import { Skeleton } from "antd";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function CoursSubjects({ cours }) {
  return (
    <Grid container>
      {!cours ? (
        <Skeleton
          title
          active
          paragraph={{
            rows: 3,
          }}
        />
      ) : (
        <>
          <Grid item style={{ padding: "10px" }}>
            <Typography variant="h6">سرفصل های دوره</Typography>
          </Grid>
          <Grid container justifyContent="flex-start" flexDirection="column">
            {cours.coursSubjects &&
              cours.coursSubjects.map((subject, i) => (
                <Grid key={i} item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="subtitle1"
                    style={{ margin: "15px 0px 15px 0px" }}
                  >
                    - {subject}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default CoursSubjects;
