import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BiSelectMultiple } from "react-icons/bi";
import eventsName from "../../public/eventsName.json";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

import InputRadioForm from "../globalComponents/InputRadioForm";

import { eventTypeFilter } from "../redux/features/eventSlice";
import { coursTypeFilter } from "../redux/features/coursSlice";
import FiltersModal from "./FiltersModal";

export default function TypeFilter({ title, status }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo.userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event_type, setEvent_type] = useState([]);
  const userID = userData?._id;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (event_type.length === 0) {
      dispatch(
        eventTypeFilter([
          "اسکی",
          "کوهنوردی",
          "جنگل گردی",
          "طبیعتگردی",
          "کویر نوردی",
          "تنگه نوردی",
          "دوچرخه سواری",
          "گشت شهری",
        ])
      );
      dispatch(
        coursTypeFilter([
          "اسکی",
          "کوهنوردی",
          "جنگل گردی",
          "طبیعتگردی",
          "کویر نوردی",
          "تنگه نوردی",
          "دوچرخه سواری",
          "گشت شهری",
        ])
      );
    } else {
      axios
        .post(
          status == "/courses"
            ? "/api/courses/coursTypeFilter"
            : "/api/events/eventTypeFilter",
          { event_type, userID }
        )
        .then((res) => {
          if (res.data.data) {
            status == "/courses"
              ? dispatch(coursTypeFilter(res.data.data))
              : dispatch(eventTypeFilter(res.data.data));
          } else {
            status == "/courses"
              ? dispatch(coursTypeFilter([]))
              : dispatch(eventTypeFilter([]));
            toast.error(res.data.message);
          }
        });
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    status == "/courses"
      ? dispatch(coursTypeFilter(0))
      : dispatch(eventTypeFilter(0));
    setIsModalOpen(false);
  };
  const onChange = (event) => {
    setEvent_type(event.target.value);
  };

  return (
    <>
      <IconButton size="large" onClick={showModal} color="inherit">
        <BiSelectMultiple style={{ marginLeft: "5px", width: "20px" }} />
        <Typography style={{ color: "#fff" }}> {title}</Typography>
      </IconButton>
      <FiltersModal
        open={isModalOpen}
        handleOk={handleOk}
        title={title}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      >
        <InputRadioForm
          inputListItems={eventsName}
          onChange={onChange}
          value={event_type}
          name="event_type"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
      </FiltersModal>
    </>
  );
}
