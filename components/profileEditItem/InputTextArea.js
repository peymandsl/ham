import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { getSession, useSession } from "next-auth/react";

import { Input } from "antd";

const { TextArea } = Input;

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CheckIcon from "@mui/icons-material/Check";

function InputTextArea({
  title,
  name,
  show,
  value,
  updatedItem,
  textFieldID,
  placeholder,
  tooltipIcon,
  tooltipTitle,
  tootipStyle,
  textFieldValue,
  onchangeHanlder,
}) {
  const userData = useSelector((state) => state.userInfo.userData);
  const mobile = userData.mobile;
  const [disableItem, setDisableItem] = useState(true);
  const router = useRouter();

  const { data, status } = useSession();

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;

  const onCheckHandler = () => {
    axios
      .post("/api/users/updateUser", { _id: profileId, updatedItem })
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.data);
        } else {
          toast.error(res.data);
        }
      });
    setDisableItem(true);
  };

  const onEditHandler = () => {
    setDisableItem(false);
  };
  const icon = (
    <Paper style={{ boxShadow: "none !important" }} sx={{ m: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="subtitle2">{title}</Typography>
          {tooltipTitle && (
            <Tooltip title={tooltipTitle}>
              <IconButton style={tootipStyle}>{tooltipIcon}</IconButton>
            </Tooltip>
          )}
        </Grid>
        <Grid item>
          {!disableItem && (
            <Button
              onClick={onCheckHandler}
              aria-label="editIcon"
              id={textFieldID}
            >
              <CheckIcon aria-label="editIcon" />
            </Button>
          )}
          {disableItem && (
            <Button
              onClick={onEditHandler}
              aria-label="editIcon"
              id={textFieldID}
            >
              <ModeEditOutlinedIcon aria-label="editIcon" id={textFieldID} />
            </Button>
          )}
        </Grid>
      </Grid>
      <TextArea
        rows={4}
        value={value}
        name={name}
        disabled={disableItem}
        placeholder={placeholder}
        onChange={onchangeHanlder}
      />
    </Paper>
  );

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={5}
      lg={5}
      style={{
        padding: "15px !important",
        marginLeft: "50px",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Fade in={show}>{icon}</Fade>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InputTextArea;
