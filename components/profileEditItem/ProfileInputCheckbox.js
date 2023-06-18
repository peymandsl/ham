import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";

import axios from "axios";
import { Checkbox } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { getSession, useSession } from "next-auth/react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const options = [
  {
    label: "کوهنوردی",
    value: "کوهنوردی",
  },
  {
    label: "جنگل گردی",
    value: "جنگل گردی",
  },
  {
    label: "طبیعتگردی",
    value: "طبیعتگردی",
  },
  {
    label: "کویر نوردی",
    value: "کویر نوردی",
  },
  {
    label: "تنگه نوردی",
    value: "تنگه نوردی",
  },
  {
    label: "دوچرخه سواری",
    value: "دوچرخه سواری",
  },
  {
    label: "اسکی",
    value: "اسکی",
  },
  {
    label: "گشت شهری",
    value: "گشت شهری",
  },
];

export default function ProfileInputCheckbox({
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
  const [disableItem, setDisableItem] = useState(true);
  const [club_event_types, setClub_event_types] = useState([]);
  const { data, status } = useSession();
  const router = useRouter();

  const userData = useSelector((state) => state.userInfo.userData);
  const mobile = userData.mobile;

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;

  const onCheckHandler = () => {
    axios
      .post("/api/users/updateUser", {
        _id: profileId,
        updatedItem: { club_event_types },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.data);
        } else {
          toast.error(res.data);
        }
      });
    setDisableItem(true);
  };

  const onChange = (checkedValues) => {
    setClub_event_types(checkedValues);
  };

  const onEditHandler = () => {
    setDisableItem(false);
  };

  return (
    <Fade in={show}>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        lg={5}
        style={{
          padding: "4px 15px 15px 15px !important",
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

        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Checkbox.Group
              disabled={disableItem}
              style={{ display: "block" }}
              options={options}
              value={club_event_types}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
}
