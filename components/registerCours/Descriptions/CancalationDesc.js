import React from "react";
import Typography from "@mui/material/Typography";

function CancalationDesc() {
  return (
    <div>
      <Typography variant="h6">شرایط لغو رزرو </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        در این قسمت اطلاعات مورد نیاز در مورد شرایط لغو سفر توسط فرد، میزان کسر
        هزینه در صورت لغو تا 72 ساعت قبل از سفر، 24 ساعت قبل از سفر و شرایط
        جایگزینی فرد با فرد دیگری را یادداشت کنید.
      </Typography>
    </div>
  );
}

export default CancalationDesc;
