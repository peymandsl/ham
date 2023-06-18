import React from "react";
import Image from "next/image";
import PN from "persian-number";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function LastSecondEventCard({
  city,
  item,
  title,
  imgSrc,
  altText,
  endDate,
  startDate,
  disscount,
  last_second,
}) {
  const {
    hard_ship,
    event_price,
    selectState,
    event_title,
    cours_price,
    startEventDate,
  } = item;
  return (
    <Card
      sx={{ maxWidth: 285 }}
      style={{ margin: "16px 2px 16px 0px", borderRadius: "16px" }}
    >
      <CardMedia>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute" }}>
            <Image src={imgSrc} alt="Slider Image" width={285} height={200} />
          </div>
          <div
            style={{
              position: "absolute",
              display: "flex",
              top: "50px",
              left: "98%",
            }}
          >
            {last_second && (
              <Typography
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  padding: "0px 8px",
                  width: "max-content",
                  position: "absolute",
                  borderRadius: "12px",
                  background: "rgb(204, 0, 1)",
                }}
              >
                <LocalOfferOutlinedIcon
                  style={{
                    top: "4px",
                    fontSize: "16px",
                    marginLeft: "2px",
                    position: "relative",
                  }}
                />
                رزرو فوری
              </Typography>
            )}
            {disscount && (
              <Typography
                style={{
                  top: "26px",
                  color: "black",
                  width: "108px",
                  fontSize: "14px",
                  fontFamily: "vanila",
                  padding: "0px 8px",
                  position: "absolute",
                  borderRadius: "12px",
                  background: "rgb(240, 200, 7)",
                }}
              >
                <LocalOfferOutlinedIcon
                  style={{
                    top: "4px",
                    fontSize: "16px",
                    marginLeft: "2px",
                    position: "relative",
                  }}
                />
                {`${PN.convertEnToPe(disscount)}% تخفیف`}{" "}
              </Typography>
            )}
          </div>

          <div
            style={{
              position: "relative",
              background:
                "linear-gradient(rgba(0, 0, 0, 1000) 0%, rgba(0, 0, 0,0) 100%)",
              height: "50px",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                color: "#fff",
                paddingTop: "10px",
                paddingRight: "10px",
              }}
            >
              {title}
            </Typography>
          </div>
        </div>
      </CardMedia>
      <CardContent style={{ marginTop: "140px", paddingTop: "0px !important" }}>
        <Typography>{event_title}</Typography>

        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography style={{ fontSize: "14px" }}>
              <HiOutlineLocationMarker />
              {selectState}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Typography style={{ fontSize: "14px" }}>میزان سختی</Typography>{" "}
          <Typography style={{ fontSize: "14px" }}>
            {hard_ship.toLocaleString("fa-IR")} از {PN.convertEnToPe(5)}
          </Typography>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography style={{ fontSize: "14px", marginLeft: "22px" }}>
              {event_price && (+event_price).toLocaleString("fa-IR")}
              {cours_price && (+cours_price).toLocaleString("fa-IR")}
              تومان
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "14px" }}>
              {startEventDate}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
