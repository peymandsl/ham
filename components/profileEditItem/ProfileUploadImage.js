import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Form } from "antd";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CheckIcon from "@mui/icons-material/Check";

import UploadImage from "../globalComponents/UploadImage";

function ProfileUploadImage({
  title,
  name,
  value,
  submitURL,
  imageApi,
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
  const [disableItem, setDisableItem] = useState(true);
  const [imageName, setImageName] = useState("");
  const mobile = userData.mobile;
  const [form] = Form.useForm();
  const { data, status } = useSession();
  const router = useRouter();

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;
  const onCheckHandler = () => {
    axios
      .put(`/api/users/updateUser/${imageApi}`, { _id: profileId, imageName })
      .then((res) => {
        res && toast.success("تغییرات با موفقیت اعمال شد!");
      })
      .catch((err) => {
        err && toast.error("مشکلی رخ داده است!");
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
            <Form.Item className="text-center" name="logo">
              <UploadImage
                submitURL={submitURL}
                key="logo"
                afterUpload={(value) => {
                  setImageName(value);
                }}
              />
            </Form.Item>
          </Form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileUploadImage;
