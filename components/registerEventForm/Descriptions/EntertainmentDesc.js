import React from "react";

import Typography from "@mui/material/Typography";
function EntertainmentDesc() {
  return (
    <div>
      <Typography variant="h6">توضیحات تفریحات و گشت ها </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        در این قسمت تفریحات در نظر گرفته شده و گشت هایی که در طی برنامه اجرا
        خواهد شد را انتخاب می کنید{" "}
      </Typography>
    </div>
  );
}

export default EntertainmentDesc;
