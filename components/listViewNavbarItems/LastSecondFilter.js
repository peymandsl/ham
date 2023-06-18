import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbZoomMoney } from "react-icons/tb";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import axios from "axios";

import FiltersModal from "./FiltersModal";
import { lastSecondFilter } from "../redux/features/eventSlice";
import { coursLastSecondFilter } from "../redux/features/coursSlice";

export default function LastSecondFilter({ title, status }) {
  const userData = useSelector((state) => state.userInfo.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [last_second, setLast_second] = useState(false);

  const dispatch = useDispatch();
  const userID = userData?._id;

  const handleChangeLastSecond = () => {
    setLast_second(!last_second);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .post(
        status == "/courses"
          ? "/api/courses/coursLastSecondFilter"
          : "/api/events/eventLastSecondFilter",
        { last_second, userID }
      )
      .then((res) => {
        if (res.data.data) {
          status == "/courses"
            ? dispatch(coursLastSecondFilter(res.data.data))
            : dispatch(lastSecondFilter(res.data.data));
        } else {
          status == "/courses"
            ? dispatch(coursLastSecondFilter(0))
            : dispatch(lastSecondFilter(0));
          toast.error(res.data.message);
        }
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    status == "/courses"
      ? dispatch(coursLastSecondFilter(0))
      : dispatch(lastSecondFilter(0));
    setIsModalOpen(false);
  };

  const formatter = (value) => value.toLocaleString("fa-IR");

  return (
    <>
      <IconButton size="large" onClick={showModal} color="inherit">
        <TbZoomMoney style={{ marginLeft: "5px", width: "20px" }} />
        <Typography style={{ color: "#fff" }}> {title}</Typography>
      </IconButton>
      <FiltersModal
        open={isModalOpen}
        handleOk={handleOk}
        title="فلیتر استان ها"
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={last_second}
                onChange={handleChangeLastSecond}
                inputProps={{ "aria-label": "controlled" }}
                sx={{
                  color: red[900],
                  "&.Mui-checked": {
                    color: red[800],
                  },
                }}
              />
            }
            label="تور لحظه آخری"
          />
        </FormGroup>
      </FiltersModal>
    </>
  );
}
