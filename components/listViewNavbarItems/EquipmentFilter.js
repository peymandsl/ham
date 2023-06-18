import React from "react";

import Radio from "@mui/material/Radio";
import DropdownPopper from "../dopdownPopper";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FormControlLabel from "@mui/material/FormControlLabel";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

export default function EquipmentFilter({
  onClick,
  anchorEl,
  placement,
  open,
}) {
  return (
    <>
      <IconButton size="large" onClick={onClick} color="inherit">
        <PeopleOutlinedIcon />
        <Typography>تجهیزات</Typography>
      </IconButton>

      <DropdownPopper
        style={{ display: "none" }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">تعداد نفرات</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="5" control={<Radio />} label="تا 5 نفر" />
            <FormControlLabel
              value="10"
              control={<Radio />}
              label="تا 10 نفر"
            />
            <FormControlLabel
              value="20"
              control={<Radio />}
              label="تا 20 نفر"
            />
            <FormControlLabel
              value="فرقی ندارد"
              control={<Radio />}
              label="فرقی ندارد"
            />
          </RadioGroup>
        </FormControl>
      </DropdownPopper>
    </>
  );
}
