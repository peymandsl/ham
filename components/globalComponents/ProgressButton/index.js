import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { deepOrange } from "@mui/material/colors";
import Button from "@mui/material/Button";

export default function ProgressButton({
  children,
  disabled,
  loading,
  onClick,
  size,
  style,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          style={style}
          variant="contained"
          size={size}
          disabled={loading || disabled}
          onClick={onClick}
        >
          {children}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: deepOrange[900],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
