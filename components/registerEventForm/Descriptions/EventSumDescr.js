import React from "react";
import Typography from "@mui/material/Typography";

function EventSumDescr() {
  return (
    <div>
      <Typography variant="h6">توضیحات خدمات باشگاه </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        این قسمت از دو بخش اصلی و ادامه مطلب تشکیل شده که قسمت اول شامل شرح و
        معرفی کلی برنامه می باشد. <br />
        قسمت دوم شامل جزییات و توضیحات برنامه می باشد که پس از انتخاب ادامه مطلب
        توسط کاربر نمایش داده می شود.{" "}
      </Typography>
    </div>
  );
}

export default EventSumDescr;
