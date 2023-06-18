import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";

const UploadImage = ({ img, afterUpload, onSubmitHandler, submitURL }) => {
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("media", file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    axios({
      url: submitURL,
      method: "post",
      data: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          toast.success("فایل مورد نظر با موفقیت بارگذاری شد!");
          setUploading(false);
          afterUpload(res.data);
          setUploadedMedia(true);
        }
      })
      .catch((err) => {
        toast.warning(err.response.data);
        setUploading(false);
        setUploadedMedia(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      //   if (img && img === true) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        // setFileList((prevState) => [...prevState, file]);
        setFileList([file]);
        return false;
      } else {
        toast.error("فرمت عکس وارد شده قابل قبول نیست!");
      }
    },
    fileList,
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Upload maxCount={1} {...props}>
          <Button icon={<UploadOutlined />}>انتخاب عکس</Button>
        </Upload>
      </Grid>
      <Grid item>
        <Button
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          disabled={
            fileList.length === 0 ||
            fileList.length > 1 ||
            uploadedMedia === true
          }
          //   style={{
          //     marginTop: 16,
          //   }}
        >
          {uploading ? "در حال بارگذاری" : "شروع بارگذاری"}
        </Button>
      </Grid>
    </Grid>
  );
};
export default UploadImage;
