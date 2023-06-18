import React from "react";
import Radio from "@mui/material/Radio";
import { red } from "@mui/material/colors";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function InputRadioForm({
  name,
  style,
  value,
  onChange,
  inputListItems,
  inputRadioTitle,
}) {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          {inputRadioTitle}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name={name}
          value={value || ""}
          onChange={onChange}
          style={style}
        >
          {inputListItems.map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                value={item.value}
                control={
                  <Radio
                    sx={{
                      // color: red[800],
                      "&.Mui-checked": {
                        color: red[600],
                      },
                    }}
                  />
                }
                label={item.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
