import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";

export default function DropdownPopper({
  open,
  children,
  anchorEl,
  placement,
}) {
  return (
    <Box sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>{children}</Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
