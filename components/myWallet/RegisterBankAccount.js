import React, { useState } from "react";
import Box from "@mui/material/Box";
import ModalBox from "../modalBox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

function RegisterBankAccount() {
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
        ثبت شماره شبا
      </Button>
      <ModalBox
        onClose={onClickClose}
        style={{ width: "600px" }}
        open={open}
        setOpen={setOpen}
      >
        <Typography style={{ padding: "0px 10px 0 0", fontWeight: "600" }}>
          ثبت شماره شبا
        </Typography>
        <TextField
          style={{ direction: "ltr", padding: "20px 10px 0 10px" }}
          id="outlined-start-adornment"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">IR</InputAdornment>
            ),
          }}
        />
        <Typography style={{ padding: "10px 10px 0 0" }}>
          شماره شبای ثبت شده می بایست به نام "پیمان بحرینی" باشد. در غیر این
          صورت اکمکتم تایید .جود ندارد{" "}
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
            ثبت یا ویرایش
          </Button>
        </Grid>
      </ModalBox>
    </div>
  );
}

export default RegisterBankAccount;
