import React from "react";
import Image from "next/image";
import { Skeleton } from "antd";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import stayingLocation from "../../public/stayingLocation.json";

function EventStayingLocation({ event, cours }) {
  let coursObj = cours?.stayingLocation;
  let courskeys = coursObj && Object.keys(coursObj);

  let obj = event?.stayingLocation;
  let keys = obj && Object.keys(obj);
  let filteredServices = keys?.filter(function (key) {
    return obj[key];
  });
  const filteredItem =
    filteredServices &&
    filteredServices.map((service, i) => {
      return stayingLocation.find((item) => item.label == service);
    });

  let filteredCoursServices = courskeys?.filter(function (key) {
    return obj[key];
  });
  const filteredCoursItem =
    filteredCoursServices &&
    filteredCoursServices.map((service, i) => {
      return stayingLocation.find((item) => item.label == service);
    });
  return (
    <Grid container>
      {!event && !cours ? (
        <Skeleton
          title
          active
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <>
          <Grid item style={{ padding: "10px" }}>
            <Typography variant="h6"> اقامت در سفر</Typography>
          </Grid>
          <Grid container justifyContent="flex-start">
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
            {filteredCoursItem &&
              filteredCoursItem.map((Service, i) => (
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
        </>
      )}
    </Grid>
  );
}

export default EventStayingLocation;
