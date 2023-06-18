import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";

import FormControl from "@mui/material/FormControl";

export default function InputSelectForm({
  placeHolder,
  itemsList,
  widthProp,
  disabled,
  onChange,
  setValue,
  value,
  name,
}) {
  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Box style={{ width: widthProp }}>
      <FormControl fullWidth>
        <Select
          style={{ height: "40px", borderRadius: "5px" }}
          disabled={disabled}
          name={name}
          displayEmpty
          value={value || ""}
          input={<OutlinedInput />}
          onChange={setValue ? handleSelectChange : onChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{placeHolder}</em>;
            }

            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          {itemsList &&
            itemsList.map((item) => (
              <MenuItem
                key={item.id ? item.id : item}
                value={item.name ? item.name : item}
              >
                {item.name ? item.name : item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
