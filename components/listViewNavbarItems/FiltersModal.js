import { Button, Modal } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const FiltersModal = ({
  open,
  title,
  handleOk,
  children,
  handleDelete,
  handleCancel,
}) => {
  return (
    <Modal
      bodyStyle={{ margin: "30px 0px" }}
      open={open}
      title={title}
      okText="اعمال"
      onOk={handleOk}
      cancelText="انصراف"
      onCancel={handleCancel}
      icon={<SearchOutlined />}
      footer={[
        <Button
          key="submit"
          onClick={handleOk}
        >
          اعمال <SearchOutlined />
        </Button>,
        <Button key="back" onClick={handleCancel}>
          انصراف
          <CloseOutlined />
        </Button>,
        <Button key="delete" type="dashed" onClick={handleDelete}>
          پاک کردن <DeleteOutlined />
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};
export default FiltersModal;
