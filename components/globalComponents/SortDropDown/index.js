import React, { useState, useEffect } from "react";

import { Button, Dropdown, Space, Tooltip, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FaSortAmountDown } from "react-icons/fa";
import { eventSort } from "../../redux/features/eventSlice";

const items = [
  {
    label: "آسانترین",
    key: "easiest",
  },
  {
    label: "سخت ترین",
    key: "hardest",
  },
  {
    label: "جدید ترین",
    key: "newest",
  },
  {
    label: "کمترین قیمت",
    key: "lowest",
  },
  {
    label: "بیشترین قیمت",
    key: "highest",
  },
  {
    label: "بیشترین تخفیف",
    key: "discount",
  },
];

const SortDropDown = () => {
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    dispatch(eventSort(e.key));
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            <FaSortAmountDown />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};
export default SortDropDown;
