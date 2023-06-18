import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import entertainmentsList from "../../../public/entertainments.json";

export default function Entertainments({ setSubmitEventData, setDisableBtn }) {
  const [entertainments, setEntertainments] = useState({});
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [entertainments_Payment, setEntertainments_Payment] = useState(true);

  const onchangeHanlder = (event) => {
    setEntertainments((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    if (Object.keys(entertainments).length !== 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData({
      entertainments,
      entertainments_Payment,
    });
  }, [entertainments, entertainments_Payment]);

  const handleChangePayment = (event) => {
    setEntertainments_Payment(event.target.checked);
  };

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">گشت ها</Typography>
      </Grid>
      <FormGroup>
        <Grid container>
          {entertainmentsList.map((item) => (
            <Grid item key={item.id} xs={6} sm={6} md={3} lg={4}>
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    name={item.name}
                    checked={entertainments[item.name] || false}
                    onChange={onchangeHanlder}
                    color="error"
                    {...label}
                  />
                }
                // label={item.label + <RiMotorbikeFill />}
                label={item.label}
              />
            </Grid>
          ))}
          <Grid item xs={6} sm={6} md={3} lg={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="guestPayment"
                  checked={entertainments_Payment}
                  onChange={handleChangePayment}
                  color="error"
                  {...label}
                />
              }
              label="هزینه تفریحات به عهده شخص می باشد."
            />
          </Grid>
        </Grid>
      </FormGroup>
    </Grid>
  );
}
