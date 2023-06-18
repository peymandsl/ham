import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function ClubServiceDescr() {
  return (
    <div>
      <Typography variant="h6">توضیحات خدمات باشگاه </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        در این قسمت وعده های پذرایی که به عهده باشگاه برگزار کننده می باشد را
        تعیین کرده و در قسمت توضیحات در صورت نیاز به یادداشت نوع غذا، سلف سرویس
        بودن، و غیره اشاره کرد. <br />
        در قسمت بعد نیز می توانید خدمات مختلف باشگاه را برای راهنمایی بهتر
        گردشگر انتخاب کنید.
        <br />
      </Typography>
    </div>
  );
}

export default ClubServiceDescr;
