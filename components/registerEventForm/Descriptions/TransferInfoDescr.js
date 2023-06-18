import React from "react";
import Typography from "@mui/material/Typography";

function TransferInfoDescr() {
  return (
    <div>
      <Typography variant="h6">توضیحات اطلاعات درباره حرکت </Typography>
      <Typography variant="body2" style={{ textAlign: "justify" }}>
        در این قسمت اطلاعات مربوط به تاریخ، ساعت، محل حرکت و نحوه پیوستن به گروه
        را وارد می کنید.
      </Typography>
    </div>
  );
}

export default TransferInfoDescr;
