import React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import recomendedEq from "../../public/recomendedEq.json";

function RecomendedEq({ event, cours }) {
  let coursObj = cours?.recommended_list;
  let courskeys = coursObj && Object.keys(coursObj);
  let filteredCoursServices = courskeys?.filter(function (key) {
    return obj[key];
  });
  const filteredCoursItem =
    filteredCoursServices &&
    filteredCoursServices.map((service, i) => {
      return recomendedEq.find((item) => item.label == service);
    });

  let obj = event?.recommended_list;
  let keys = obj && Object.keys(obj);
  let filteredServices = keys?.filter(function (key) {
    return obj[key];
  });
  const filteredItem =
    filteredServices &&
    filteredServices.map((service, i) => {
      return recomendedEq.find((item) => item.label == service);
    });

  return (
    <Grid container>
      <>
        <Grid item style={{ padding: "10px" }}>
          <Typography variant="h6">لوازم پیشنهادی</Typography>
        </Grid>
        <Grid container justifyContent="flex-start">
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
      </>
    </Grid>
  );
}

export default RecomendedEq;
