import React from "react";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";

import PN from "persian-number";

function EventInfo({ event, cours, eventStatus }) {
  return (
    <Grid container>
      <>
        <Grid container alignItems="center" spacing={1}>
          <Grid container item xs={6} sm={6} md={6} lg={6}>
            <Grid item>
              <Typography gutterBottom variant="h6">
                {eventStatus ? event?.event_title : cours?.cours_title}
              </Typography>
            </Grid>
            <Grid item>
              {event?.peak_height && (
                <Typography variant="caption">
                  {PN.convertEnToPe(event.peak_height)}متر
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {(event?.last_second || cours?.last_second) && (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography style={{ margin: "15px 0px 15px 0px" }}>
                  <DoneIcon style={{ color: "firebrick" }} />
                  ثبت نام لحظه آخری
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            variant="subtitle1"
            style={{ margin: "15px 0px 15px 0px" }}
          >
            مدت برنامه:{" "}
            {PN.convertEnToPe(
              eventStatus ? event?.travel_days : cours.travel_days
            )}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Grid container style={{ margin: "15px 0px 15px 0px" }}>
            <Typography variant="subtitle1" style={{ fontSize: "14px" }}>
              میزان سختی
            </Typography>{" "}
            <Typography style={{ fontSize: "14px" }}>
              {eventStatus
                ? event?.hard_ship.toLocaleString("fa-IR")
                : cours?.hard_ship.toLocaleString("fa-IR")}{" "}
              از {PN.convertEnToPe(5)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            variant="subtitle1"
            style={{ margin: "15px 0px 15px 0px" }}
          >
            تاریخ رفت{" "}
            {eventStatus ? event?.startEventDate : cours.startEventDate}
          </Typography>
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            variant="subtitle1"
            style={{ margin: "15px 0px 15px 0px" }}
          >
            تاریخ برگشت {eventStatus ? event?.endEventDate : cours.endEventDate}
          </Typography>
        </Grid>

        {cours?.certificate && (
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography
              variant="subtitle1"
              style={{ margin: "15px 0px 15px 0px" }}
            >
              <DoneIcon style={{ color: "firebrick" }} />
              صدور گواهینامه شرکت در دوره
            </Typography>
          </Grid>
        )}

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="subtitle1"
              style={{ margin: "15px 0px 15px 0px" }}
            >
              توضیحات حرکت:{" "}
              {eventStatus
                ? event?.tavel_start_description
                : cours?.tavel_start_description}
            </Typography>
          </Grid>
        </Grid>
      </>
    </Grid>
  );
}

export default EventInfo;
