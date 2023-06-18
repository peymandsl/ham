import React, { useState } from "react";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";

export default function SelectInput() {
  const [person, setPerson] = useState("");

  const handleSelectChange = (e) => {
    setPerson(e.target.value);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <Select
          style={{ height: "40px", borderRadius: "10px" }}
          displayEmpty
          value={
            person === "" ? person : person.toLocaleString("fa-IR") + "نفر"
          }
          onChange={handleSelectChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>تعداد نفرات را مشخص کنید</em>;
            }

            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem key="1" value={1}>
            {(1).toLocaleString("fa-IR")} نفر
          </MenuItem>
          <MenuItem key="2" value={2}>
            {(2).toLocaleString("fa-IR")} نفر
          </MenuItem>
          <MenuItem key="3" value={3}>
            {(3).toLocaleString("fa-IR")} نفر
          </MenuItem>
          <MenuItem key="4" value={4}>
            {(4).toLocaleString("fa-IR")} نفر
          </MenuItem>
          <MenuItem key="5" value={5}>
            {(5).toLocaleString("fa-IR")} نفر
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
