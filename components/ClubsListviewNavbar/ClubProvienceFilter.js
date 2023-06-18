import React, { useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { TbZoomMoney } from "react-icons/tb";
import IconButton from "@mui/material/IconButton";

import stateList from "../../public/irn.json";
import InputSelectForm from "../globalComponents/InputSelect";
import FiltersModal from "../listViewNavbarItems/FiltersModal";
import { clubProvienceFilter } from "../redux/features/userSlice";

export default function ClubProvienceFilter({ title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectState, setSelectState] = useState("");
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    axios
      .post("/api/clubs/clubProvienceFilter", { selectState })
      .then((res) => {
        if (res.data.data) {
          dispatch(clubProvienceFilter(res.data.data));
        } else {
          dispatch(clubProvienceFilter(0));
          toast.error(res.data.message);
        }
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(clubProvienceFilter(0));
    setIsModalOpen(false);
  };

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
