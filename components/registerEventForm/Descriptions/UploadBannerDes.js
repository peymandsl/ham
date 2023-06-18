import React from "react";

import Typography from "@mui/material/Typography";
function UploadBannerDes() {
  return (
    <div>
      <Typography variant="h6">توضیحات آپلود تصویر برنامه </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        لطفا تصویری از برنامه های گذشته یا تصویری مرتبط با برنامه پیش رو را در
        این قسمت بارگزاری کنید تا به عنوان تصویر بنر برنامه نمایش داده شود.
      </Typography>
    </div>
  );
}

export default UploadBannerDes;
