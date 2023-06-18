import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Description() {
  return (
    <Paper
      style={{
        padding: "20px",
        borderRadius: "10px",
        border: "none",
        margin: "15px",
        borderRadius: "8px",
        boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
      }}
      elevation={1}
    >
      <Typography variant="h6">عنوان </Typography>
      <Typography variant="body2">توضیحات </Typography>
    </Paper>
  );
}

export default Description;
