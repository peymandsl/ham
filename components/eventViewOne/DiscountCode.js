import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import Collapse from "@mui/material/Collapse";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DiscountCode({
  setCoursFinalPrice,
  setFinalPrice,
  discount_code,
  discount_percent,
  event_price,
  cours_price,
}) {
  const [inputCode, setInputCode] = useState("");
  const [checked, setChecked] = useState(true);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const onChangeHandler = (e) => {
    setInputCode(e.target.value);
  };

  const onSubmitCode = () => {
    if (discount_code == inputCode) {
      event_price &&
        setFinalPrice(event_price - (discount_percent / 100) * event_price);
      cours_price &&
        setCoursFinalPrice(
          cours_price - (discount_percent / 100) * cours_price
        );
      toast.success("تخفیف اعمال شد");
    } else {
      toast.error("کد وارد شده اشتباه می باشد");
    }
  };

  return (
    <Box style={{ marginTop: "10px" }}>
      <Typography style={{ cursor: "pointer" }} onClick={handleChange}>
        کد تخفیف
      </Typography>
      <Collapse in={checked}>
        <Grid container style={{ marginTop: "6px" }} spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper component="form" style={{ height: "30px", width: "138px" }}>
              <InputBase value={inputCode} onChange={onChangeHandler} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Button
              onClick={onSubmitCode}
              size="small"
              style={{
                width: "138px",
                color: "black",
                fontWeight: "600",
                backgroundColor: "rgb(240, 200, 7)",
              }}
              fullWidth
              variant="contained"
            >
              اعمال کد تخفیف
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
}
