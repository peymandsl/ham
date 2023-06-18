import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

import recomendedEquipment from "../../../public/recomendedEq.json";

export default function RecomendedEquipment({
  setSubmitEventData,
  setDisableBtn,
}) {
  const [recomendedEq, setRecomendedEq] = useState({});
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const onchangeHanlder = (event) => {
    setRecomendedEq((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  let recommended_list = { ...recomendedEq };
  useEffect(() => {
    if (Object.keys(recomendedEq).length !== 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData(recommended_list);
  }, [recomendedEq]);

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">لوازم پیشنهادی</Typography>
      </Grid>
      <FormGroup>
        <Grid container>
          {recomendedEquipment.map((item) => (
            <Grid item key={item.id} xs={6} sm={6} md={3} lg={4}>
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    name={item.name}
                    checked={recomendedEq[item.name] || false}
                    onChange={onchangeHanlder}
                    color="error"
                    {...label}
                  />
                }
                label={item.label}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </Grid>
  );
}
