import React from "react";
import Grid from "@mui/material/Grid";
import { ImSpoonKnife } from "react-icons/im";
import Typography from "@mui/material/Typography";
import clubServicesList from "../../public/clubServicesList.json";

import Image from "next/image";

function EventServices({ event }) {
  let obj = event.club_services_items;
  let keys = obj && Object.keys(obj);
  let filteredServices = keys?.filter(function (key) {
    return obj[key];
  });
  const filteredItem = filteredServices.map((service, i) => {
    return clubServicesList.find((item) => item.label == service);
  });
  return (
    <Grid container>
      <>
        <Grid item style={{ padding: "10px" }}>
          <Typography variant="h6">خدمات باشگاه</Typography>
        </Grid>
        <Grid container justifyContent="flex-start">
          {event.breakfast_service && (
            <Grid item xs={6} sm={3} md={3} lg={3}>
              <Typography
                variant="subtitle1"
                style={{ margin: "15px 0px 15px 0px" }}
              >
                <ImSpoonKnife />
                {"  "} صبحانه: {event.breakfast_service}
              </Typography>
            </Grid>
          )}
          {event.lunch_service && (
            <Grid item xs={6} sm={3} md={3} lg={3}>
              <Typography
                variant="subtitle1"
                style={{ margin: "15px 0px 15px 0px" }}
              >
                <ImSpoonKnife /> {"  "}
                نهار: {event.lunch_service}
              </Typography>
            </Grid>
          )}

          {event.dinner_service && (
            <Grid item xs={6} sm={3} md={3} lg={3}>
              <Typography
                variant="subtitle1"
                style={{ margin: "15px 0px 15px 0px" }}
              >
                <ImSpoonKnife /> {"  "}
                شام: {event.dinner_service}
              </Typography>
            </Grid>
          )}
          {event.mid_meal_service && (
            <Grid item xs={6} sm={3} md={3} lg={3}>
              <Typography
                variant="subtitle1"
                style={{ margin: "15px 0px 15px 0px" }}
              >
                <ImSpoonKnife /> {"  "}
                میان وعده: {event.mid_meal_service}
              </Typography>
            </Grid>
          )}

          {filteredItem &&
            filteredItem.map((Service, i) => (
              <Grid key={Service.id} item xs={6} sm={3} md={3} lg={3}>
                <Typography
                  variant="subtitle1"
                  style={{ margin: "15px 0px 15px 0px" }}
                >
                  <Image
                    src={`/icons/${Service.icon}`}
                    alt={Service.name}
                    width={20}
                    height={20}
                    style={{ marginLeft: "5px" }}
                  />
                  {Service.label}
                </Typography>
              </Grid>
            ))}
        </Grid>
        {event.club_service_description && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="subtitle1"
              style={{ margin: "15px 0px 15px 0px" }}
            >
              توضیحات جانبی: {event.club_service_description}
            </Typography>
          </Grid>
        )}
      </>
    </Grid>
  );
}

export default EventServices;
