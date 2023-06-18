import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiTrendingUp } from "react-icons/hi";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RatingStar from "../globalComponents/RatingStar";
import { useSelector, useDispatch } from "react-redux";
import { eventHardShipFilter } from "../redux/features/eventSlice";
import { coursHardshipFilter } from "../redux/features/coursSlice";
import FiltersModal from "./FiltersModal";

const hardShipLabels = {
  1: "خیلی آسان",
  2: "آسان",
  3: "متوسط",
  4: "سخت",
  5: "خیلی سخت",
};

const HardShipRating = ({ title, status }) => {
  const userData = useSelector((state) => state.userInfo.userData);

  const [hard_ship, setHard_ship] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const userID = userData?._id;

  const handleOk = () => {
    axios
      .post(
        status == "/courses"
          ? "/api/courses/coursHardshipFilter"
          : "/api/events/eventHardshipFilter",
        { hard_ship, userID }
      )
      .then((res) => {
        if (res.data.data) {
          status == "/courses"
            ? dispatch(coursHardshipFilter(res.data.data))
            : dispatch(eventHardShipFilter(res.data.data));
        } else {
          status == "/courses"
            ? dispatch(coursHardshipFilter(0))
            : dispatch(eventHardShipFilter(0));
          toast.error(res.data.message);
        }
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    setHard_ship(0);
    setIsModalOpen(false);
    status == "/courses"
      ? dispatch(coursHardshipFilter(0))
      : dispatch(eventHardShipFilter(0));
  };
  const onChange = (e) => {
    setHard_ship(e.target.value);
  };

  return (
    <>
      <IconButton size="large" onClick={showModal} color="inherit">
        <HiTrendingUp style={{ marginLeft: "5px", width: "20px" }} />
        <Typography style={{ color: "#fff" }}> {title}</Typography>
      </IconButton>
      <FiltersModal
        open={isModalOpen}
        handleOk={handleOk}
        title="میزان سختی"
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      >
        <RatingStar
          name="hard_ship"
          onChange={onChange}
          value={hard_ship || 0}
          labels={hardShipLabels}
        />
      </FiltersModal>
    </>
  );
};

export default HardShipRating;
