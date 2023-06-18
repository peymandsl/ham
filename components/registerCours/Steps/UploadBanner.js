import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UploadImage from "../../globalComponents/UploadImage";
import { Form, Image } from "antd";

export default function UploadBanner({
  setSubmitCoursData,
  setDisableBtn,
  editCours,
}) {
  const [form] = Form.useForm();
  const [coursBanner, setCoursBanner] = useState("");
  useEffect(() => {
    if (coursBanner) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitCoursData({
      coursBanner,
    });
  }, [coursBanner]);

  useEffect(() => {
    editCours?.coursBanner
      ? setCoursBanner(editCours.coursBanner)
      : setCoursBanner();
  }, [editCours]);
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
          <Typography variant="h6">تصویر بنر دوره</Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <Form form={form} layout="vertical">
            <Form.Item className="text-center" name="coursBanner">
              <UploadImage
                key="coursBanner"
                afterUpload={(value) => {
                  setCoursBanner(value);
                }}
                submitURL="uploadCoursBanner"
                // onSubmitHandler={onSubmitHandler()}
              />
            </Form.Item>
          </Form>
        </Grid>
        <Grid item style={{ display: "flex", justifyContent: "center" }}>
          <Image
            width={400}
            alt="Cours Banner"
            src={
              coursBanner
                ? `/uploads/cours_banners/${coursBanner}`
                : "/uploads/cours_banners/1.jpg"
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
