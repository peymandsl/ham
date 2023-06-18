import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Tooltip from "@mui/material/Tooltip";

import { Form } from "antd";

import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CheckIcon from "@mui/icons-material/Check";

import UploadImage from "../globalComponents/UploadImage";

function ProfileClubBanner({
  title,
  value,
  textFieldID,
  tooltipIcon,
  tooltipTitle,
  tootipStyle,
}) {
  const userData = useSelector((state) => state.userInfo.userData);
  const [disableItem, setDisableItem] = useState(true);
  const [logoId, setLogoId] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const { data, status } = useSession();

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;

  const onCheckHandler = () => {
    axios
      .put("/api/users/updateUser/updateLogo", { _id: profileId, logoId })
      .then((res) => {
        toast.success("تغییرات با موفقیت اعمال شد!");
      })
      .catch((err) => {
        toast.error("مشکلی رخ داده است!");
      });

    setDisableItem(true);
  };

  const onEditHandler = () => {
    setDisableItem(false);
  };

  return (
    <Grid
      item
      xs={10}
      sm={5}
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
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Form disabled={disableItem} form={form} layout="vertical">
            <Form.Item
              className="text-center"
              //   label="تصویر پروفایل"
              name="logo"
            >
              <UploadImage
                key="logo"
                afterUpload={(value) => {
                  setLogoId(value[0]._id);
                }}
              />
            </Form.Item>
          </Form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileClubBanner;
