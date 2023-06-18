import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Slider, Typography } from "antd";
import { TbZoomMoney } from "react-icons/tb";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";

import { coursPriceFilter } from "../redux/features/coursSlice";
import { eventPriceFilter } from "../redux/features/eventSlice";
import FiltersModal from "./FiltersModal";

export default function PriceRangeFilter({ title, status }) {
  const userData = useSelector((state) => state.userInfo.userData);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { Text } = Typography;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const userID = userData?._id;
  const handleOk = () => {
    axios
      .post(
        status == "/courses"
          ? "/api/courses/coursPriceFilter"
          : "/api/events/eventPriceFilter",
        { priceRange, userID }
      )
      .then((res) => {
        if (res.data.data) {
          status == "/courses"
            ? dispatch(coursPriceFilter(res.data.data))
            : dispatch(eventPriceFilter(res.data.data));
        } else {
          status == "/courses"
            ? dispatch(coursPriceFilter(0))
            : dispatch(eventPriceFilter(0));
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
      ? dispatch(coursPriceFilter(0))
      : dispatch(eventPriceFilter(0));
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setPriceRange(e);
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
        title="محدوده قیمت"
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      >
        <Slider
          range
          autoFocus
          step={200000}
          max={5000000}
          onChange={onChange}
          tooltip={{ formatter }}
          defaultValue={[0, 5000000]}
          style={{ marginBottom: "20px" }}
        />
        <Text>{`شروع قیمت از ${priceRange[0].toLocaleString(
          "fa-IR"
        )} الی ${priceRange[1].toLocaleString("fa-IR")} تومان`}</Text>
      </FiltersModal>
    </>
  );
}
