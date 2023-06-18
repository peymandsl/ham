import * as React from "react";
import Image from "next/image";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function LearningEventCard({
  city,
  title,
  imgSrc,
  altText,
  startDate,
  disscount,
}) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "16px 2px 16px 0px" }}>
      <CardMedia>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute" }}>
            <Image src={imgSrc} alt="Slider Image" width={285} height={200} />
          </div>
          <div style={{ position: "relative", top: "15px", right: "15px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </div>
        </div>
      </CardMedia>
      <CardContent style={{ marginTop: "160px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          شروع: {startDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          پایان: {endDate}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {disscount}
        </Typography>
      </CardContent>
    </Card>
  );
}
