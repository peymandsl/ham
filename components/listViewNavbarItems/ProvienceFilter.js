import React, { useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import { toast } from "react-toastify";
import { TbZoomMoney } from "react-icons/tb";
import stateList from "../../public/irn.json";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import InputSelectForm from "../globalComponents/InputSelect";

import { eventProvienceFilter } from "../redux/features/eventSlice";
import { coursProvienceFilter } from "../redux/features/coursSlice";
import FiltersModal from "./FiltersModal";

export default function ProvienceFilter({ title, status }) {
  const userData = useSelector((state) => state.userInfo.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectState, setSelectState] = useState("");
  const userID = userData?._id;
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .post(
        status == "/courses"
          ? "/api/courses/coursProvienceFilter"
          : "/api/events/eventProvienceFilter",
        { selectState, userID }
      )
      .then((res) => {
        if (res.data.data) {
          status == "/courses"
            ? dispatch(coursProvienceFilter(res.data.data))
            : dispatch(eventProvienceFilter(res.data.data));
        } else {
          status == "/courses"
            ? dispatch(coursProvienceFilter(0))
            : dispatch(eventProvienceFilter(0));
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
      ? dispatch(coursProvienceFilter(0))
      : dispatch(eventProvienceFilter(0));
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
        <InputSelectForm
          value={selectState}
          name="event_provience"
          placeHolder="استان "
          itemsList={stateList}
          setValue={setSelectState}
        />
      </FiltersModal>
    </>
  );
}
