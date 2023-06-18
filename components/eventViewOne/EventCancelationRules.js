import React from "react";
import { Skeleton } from "antd";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function EventCancelationRules({ event, cours, eventStatus }) {
  return (
    <Grid container>
      {!event && !cours ? (
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
            <Typography variant="h6">قوانین لغو ثبت نام</Typography>
          </Grid>
          <Grid container justifyContent="flex-start">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                variant="subtitle1"
                style={{ margin: "15px 0px 15px 0px" }}
              >
                {eventStatus
                  ? event.cancellation_rules
                  : cours.cancellation_rules}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default EventCancelationRules;
