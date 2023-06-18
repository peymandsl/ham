import React from "react";
import { Typography, Input, Space } from "antd";

import PN from "persian-number";

export default function InputMobileNumber({ inputMobile, setInputMobile }) {
  const { Text } = Typography;

  const onChangeMobileNumber = (e) => {
    const mobileToEng = PN.convertPeToEn(e.target.value);
    setInputMobile({ mobileNumber: mobileToEng });
  };

  return (
    <div style={{ width: "500px" }}>
      <div id="input mobile number">
        <Text
          style={{ color: "#404040", fontSize: "18px", fontWeight: "600" }}
          level={5}
        >
          برای ورود یا ثبت نام، شماره همراه به نام خود را وارد نمایید
        </Text>
      </div>
      <Space style={{ display: "flex", justifyContent: "center" }}>
        <Input
          allowClear
          size="large"
          onChange={onChangeMobileNumber}
          placeholder={PN.convertEnToPe(9123456789)}
          style={{ width: "300px", direction: "ltr", margin: "25px 0px" }}
          addonBefore={`+${(98).toLocaleString("fa-IR")}`}
          // addonBefore={+PN.convertEnToPe(9123456789)}
          value={PN.convertEnToPe(inputMobile.mobileNumber)}
        />
      </Space>
    </div>
  );
}
