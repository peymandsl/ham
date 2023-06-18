import {
  StopOutlined,
  CheckOutlined,
  DeleteOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { Dropdown, Space } from "antd";

const items = [
  {
    label: "Waiting",
    key: "waiting",
    icon: <FieldTimeOutlined />,
  },

  {
    label: "Suspend",
    key: "suspend",
    icon: <StopOutlined />,
  },

  {
    label: "Remove",
    key: "remove",
    icon: <DeleteOutlined />,
    value: "remove",
    danger: true,
  },
  {
    label: "Cancell",
    key: "cancell",
    icon: <MdOutlineCancel />,
    value: "cancell",
    danger: true,
  },
];

const InputDropDown = ({ record, setEventsList }) => {
  const handleButtonCompelete = (e) => {
    axios
      .post("/api/courses/coursStatus", { _id: record.key, cours_status: e })
      .then((res) => {
        if (res.status == 604) {
        } else {
          setEventsList(res.data.data);
        }
      });
  };

  const handleMenuClick = (e) => {
    axios
      .post("/api/courses/coursStatus", {
        _id: record.key,
        cours_status: e.key,
      })
      .then((res) => {
        if (res.status == 604) {
        } else {
          setEventsList(res.data.data);
        }
      });
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Space wrap>
      <Dropdown.Button
        menu={menuProps}
        value="confirm"
        name="confirm2"
        onClick={() => handleButtonCompelete("confirm")}
      >
        Confirm <CheckOutlined />
      </Dropdown.Button>
    </Space>
  );
};

export default InputDropDown;
