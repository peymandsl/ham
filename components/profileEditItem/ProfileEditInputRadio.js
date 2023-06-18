import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";

import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export default function ProfileEditInputRadio({
  title,
  value,
  editable,
  textFieldID,
}) {
  const [disableItem, setDisableItem] = useState(true);

  const onChangeItem = (e) => {
    if (e.target.id === textFieldID) {
      setDisableItem(false);
    } else if (!disableItem) {
      setDisableItem(true);
    }
  };
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={5}
      lg={5}
      style={{
        padding: "4px 15px 15px 15px !important",
        marginLeft: "50px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
        </Grid>
        {editable && (
          <Grid item>
            <Button
              onClick={onChangeItem}
              aria-label="editIcon"
              id={textFieldID}
            >
              {!disableItem ? (
                <CheckIcon aria-label="editIcon" />
              ) : (
                <ModeEditOutlinedIcon aria-label="editIcon" id={textFieldID} />
              )}
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <RadioGroup
            style={{
              borderBottom: "1px dotted #0000006b ",
            }}
            row
            value={value}
            id="user_gender"
            defaultValue="male"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="مرد"
              label="مرد"
              control={<Radio />}
              disabled={disableItem}
            />
            <FormControlLabel
              value="زن"
              label="زن"
              control={<Radio />}
              disabled={disableItem}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
