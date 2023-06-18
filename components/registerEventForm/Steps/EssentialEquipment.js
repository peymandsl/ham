import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import EssentialList from "../../../public/essentialList.json";

export default function EssentialEquipment({
  setSubmitEventData,
  setDisableBtn,
  editEvent,
}) {
  const [essentialEq, setEssentialEq] = useState({});
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const onchangeHanlder = (event) => {
    setEssentialEq((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    editEvent ? setEssentialEq(editEvent.essentialEq) : setEssentialEq({});
  }, [editEvent]);

  let essential_list = { essentialEq };
  useEffect(() => {
    if (Object.keys(essentialEq).length !== 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData(essential_list);
  }, [essentialEq]);

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">لوازم ضروری</Typography>
      </Grid>
      <FormGroup>
        <Grid container>
          {EssentialList.map((item) => (
            <Grid item key={item.id} xs={6} sm={6} md={3} lg={4}>
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    name={item.name}
                    checked={essentialEq[item.name] || false}
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
