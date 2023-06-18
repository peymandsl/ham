import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function BasicTooltip({
  tooltipTitle,
  tootipStyle,
  tooltipIcon,
}) {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton style={tootipStyle}>{tooltipIcon}</IconButton>
    </Tooltip>
  );
}
