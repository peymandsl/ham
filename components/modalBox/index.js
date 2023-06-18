import * as React from "react";

import { DialogTitle, Dialog, DialogContent } from "@mui/material/";

export default function ModalBox({
  open,
  title,
  style,
  onClose,
  setOpen,
  children,
  selectedValue,
}) {
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={style}>{children}</DialogContent>
    </Dialog>
  );
}
