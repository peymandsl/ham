import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";

export default function FastSearchCard({ eventType, altText, imgSrc }) {
  const [eventTypeCount, setEventTypeCount] = useState(0);
  useEffect(() => {
    axios
      .post("/api/events/eventsByEventType", { event_type: eventType })
      .then((res) => {
        if (res.data.data) {
          setEventTypeCount(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      });
  }, [eventType]);
  return (
    <Card
      style={{
        boxShadow: "none",
        borderRadius: "25px",
        margin: "16px 2px 16px 0px",
      }}
      sx={{ maxWidth: 180 }}
    >
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          <Image
            src={imgSrc}
            alt={altText}
            width={284}
            height={200}
            style={{ borderRadius: "25px" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            height: "66px",
            width: "100%",
            borderRadius: "25px",
            background:
              "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
          }}
        >
          <Grid
            container
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            style={{ bottom: "20px" }}
          >
            <Typography variant="h6" color="#fff">
              {eventType}
            </Typography>
            <Typography variant="subtitle2" color="#fff">
              {eventTypeCount}
            </Typography>
          </Grid>
        </div>
      </div>
    </Card>
  );
}
