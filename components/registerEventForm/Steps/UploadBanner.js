import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UploadImage from "../../globalComponents/UploadImage";
import { Form, Image } from "antd";

export default function UploadBanner({
  setSubmitEventData,
  setDisableBtn,
  editEvent,
}) {
  const [form] = Form.useForm();
  const [eventBanner, setEventBanner] = useState();
  useEffect(() => {
    if (eventBanner) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData({
      eventBanner,
    });
  }, [eventBanner]);

  useEffect(() => {
    editEvent?.eventBanner
      ? setEventBanner(editEvent.eventBanner)
      : setEventBanner();
  }, [editEvent]);

  return (
    <Grid container>
      <Grid
        style={{ paddingBottom: "25px" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid item>
          <Typography variant="h6">تصویر بنر برنامه</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <Form form={form} layout="vertical">
            <Form.Item className="text-center" name="eventBanner">
              <UploadImage
                key="eventBanner"
                afterUpload={(value) => {
                  setEventBanner(value);
                }}
                submitURL="uploadEventBanner"
                // onSubmitHandler={onSubmitHandler()}
              />
            </Form.Item>
          </Form>
        </Grid>
        <Grid item style={{ display: "flex", justifyContent: "center" }}>
          <Image
            width={400}
            alt="Event banner"
            src={
              eventBanner
                ? `/uploads/event_banners/${eventBanner}`
                : "/uploads/event_banners/1.jpg"
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
