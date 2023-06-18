import React from "react";
import Typography from "@mui/material/Typography";
function EventAttendDescr() {
  return (
    <div>
      <Typography variant="h6">توضیحات قوانین شرکت در برنامه </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        در این قسمت توضیحات مربوط به قوانین باشگاه در مورد شرکت در برنامه مانند
        حداقل سن، داشتن گواهینامه، کارت بیمه و غیره را یادداشت می کنید{" "}
      </Typography>
    </div>
  );
}

export default EventAttendDescr;
