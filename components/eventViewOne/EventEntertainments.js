import React from "react";
import Image from "next/image";
import { Skeleton } from "antd";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import entertainments from "../../public/entertainments.json";

function EventEntertainments({ event }) {
  let obj = event.entertainments;
  let keys = obj && Object.keys(obj);

  let filteredItems = keys?.filter(function (key) {
    return obj[key];
  });
  console.log(filteredItems, "filteredItems");
  const filteredItem = filteredItems.map((service, i) => {
    return entertainments.find((item) => item.label == service);
  });
  let userPayment = event.entertainments_Payment;

  console.log(filteredItem, "filteredItem");
  return (
    <Grid container>
      {event.length == 0 ? (
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
            <Typography variant="h6">تفریحات در سفر</Typography>
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

            {userPayment && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  variant="subtitle1"
                  style={{ margin: "15px 0px 15px 0px" }}
                >
                  <DoneIcon style={{ color: "firebrick" }} /> هزینه تفریحات به
                  عهده شخص می باشد.
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default EventEntertainments;
