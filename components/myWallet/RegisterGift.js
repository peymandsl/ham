import React, { useState } from "react";

import ModalBox from "../modalBox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function RegisterGift() {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{
          width: "100%",
          background: "rgb(240, 200, 7) ",
          color: "rgb(51, 51, 51)",
          fontSize: "14px",
        }}
        variant="contained"
        onClick={onClickOpen}
      >
        {" "}
        ثبت کارت هدیه
      </Button>
      <ModalBox
        onClose={onClickClose}
        style={{ width: "600px" }}
        open={open}
        setOpen={setOpen}
      >
        <Typography style={{ padding: "0px 10px 0 0", fontWeight: "600" }}>
          ثبت کارت هدیه{" "}
        </Typography>
        <TextField
          style={{ direction: "ltr", padding: "20px 10px 0 10px" }}
          id="outlined-start-adornment"
          size="small"
          fullWidth
        />
        <Typography style={{ padding: "10px 10px 0 0" }}>
          کد کارت هدیه خود را در ادر بالا وارد کنید{" "}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: "80px" }}
        >
          <Button
            style={{
              width: "60%",
              background: "rgb(240, 200, 7) ",
              color: "rgb(51, 51, 51)",
              fontSize: "14px",
            }}
            onClick={onClickClose}
            size="small"
            variant="contained"
          >
            ثبت
          </Button>
        </Grid>
      </ModalBox>
    </div>
  );
}

export default RegisterGift;
