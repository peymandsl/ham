import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import axios from "axios";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../redux/features/userSlice";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

function ProfileEditInputText({
  title,
  name,
  value,
  editable,
  placeholder,
  tooltipIcon,
  updatedItem,
  textFieldID,
  tootipStyle,
  tooltipTitle,
  textFieldValue,
  onchangeHanlder,
}) {
  const userData = useSelector((state) => state.userInfo.userData);
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const router = useRouter();

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;

  const mobile = userData.mobile;
  const [disableItem, setDisableItem] = useState(true);
  const onCheckHandler = () => {
    axios
      .post("/api/users/updateUser", { _id: profileId, updatedItem })
      .then((res) => {
        if (res.status == 200) {
          axios.post("/api/users/getUser", { _id: profileId }).then((res) => {
            dispatch(getUserInfo(res.data));
          });
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
        {editable && (
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
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            fullWidth
            name={name}
            value={value || ""}
            id={textFieldID}
            variant="standard"
            disabled={disableItem}
            placeholder={placeholder}
            onChange={onchangeHanlder}
            // style={{ direction: "ltr" }}
            defaultValue={textFieldValue}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileEditInputText;
