import React, { useState, useEffect } from "react";
import axios from "axios";
import PN from "persian-number";
// import Row from "@mui/material/Row";
// import Button from "@mui/material/Button";
import DateObject from "react-date-object";
// import InputBase from "@mui/material/InputBase";

// import Typography from "@mui/material/Typography";
// import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Col, Row, Typography, Button, InputNumber, Input } from "antd";

import { kyc_id } from "../../redux/features/userSlice";
import ProgressButton from "../../globalComponents/ProgressButton";
import JalaliCalander from "../../../components/globalComponents/JalaliCalander";

export default function SignUp({
  setUserAuth,
  nationalId,
  setNationalId,
  // onchangeHanlder,
  setUserBirthday,
}) {
  const { Text, Title } = Typography;

  const [loading, setLoading] = useState(false);
  const userMobile = useSelector((state) => state.userInfo.mobile);
  const [birthday, setBirthday] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  let birthdayDate = !birthday == "" ? birthday.format() : birthday;

  const dispatch = useDispatch();

  const onchangeHanlder = (e) => {
    console.log(e.target.value, "e.target.value");
    setNationalId(e.target.value);
  };
  useEffect(() => {
    setUserBirthday(birthdayDate);
  }, [birthdayDate]);

  // const onContinueBtnPress = () => {
  //   setLoading(true);
  //   axios
  //     .post("/api/auth/kycCheck", {
  //       Mobile: userMobile,
  //       IdCode: nationalId,
  //       BirthDate: birthdayDate,
  //     })
  //     .then((res) => {
  //       console.log(res.data, "/api/kycCheck");
  //       dispatch(kyc_id(res.data?.ID));
  //       setUserAuth(res.data.status);
  //       setLoading(false);
  //     });
  // };

  const onEditClick = () => {
    setUserAuth("INPUT_NUMBER");
  };
  return (
    <div style={{ paddingBottom: "15px" }}>
      <Row
        style={{
          marginBottom: "15px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Col>
          <Title style={{ color: "#404040" }} level={5}>
            {PN.convertEnToPe(userMobile)}
          </Title>
        </Col>
        <Col>
          <Button onClick={onEditClick} danger>
            ویرایش
          </Button>
        </Col>
      </Row>
      <Row
        style={{ marginBottom: "20px" }}
        // justifyContent="space-between"
        // alignItems="center"
      >
        <Col xs={24} sm={10} md={10} lg={8}>
          <Title
            style={{ color: "#404040", fontSize: "18px", fontWeight: "600" }}
            level={5}
            // component={"span"}
            // gutterBottom
          >
            تاریخ تولد{" "}
          </Title>
        </Col>
        <Col xs={24} sm={10} md={10} lg={16}>
          <JalaliCalander
            className="rmdp-mobile"
            travelStartDate={birthday}
            setTravelStartDate={setBirthday}
          />
        </Col>
      </Row>
      <Row
        // container
        // justifyContent="space-between"
        // alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Col xs={24} sm={10} md={10} lg={8}>
          <Title
            style={{ color: "#404040", fontSize: "18px", fontWeight: "600" }}
            level={5}
            // component={"span"}
            // gutterBottom
          >
            کد ملی
          </Title>
        </Col>
        <Col xs={24} sm={10} md={10} lg={16}>
          {/* <Input defaultValue="26888888" /> */}
          <Input
            size="large"
            style={{
              width: "100%",
              height: "45px",
              fontSize: "14px",
              borderRadius: "4px",
              padding: "15px 10px",
              border: "1px solid #c0c4d6",
            }}
            // onChange={(event) => onchangeHanlder(event)}
            onChange={onchangeHanlder}
            value={
              nationalId == 0 || !nationalId ? "" : PN.convertEnToPe(nationalId)
            }
            name="nationalId"
            id="outlined-basic"
            defaultValue="26888888"
            // size="small"
            // variant="outlined"
          />
        </Col>
      </Row>

      {/* <DialogActions style={{ flexFlow: "column" }}>
          <ProgressButton
            disabled={nationalId.length !== 10}
            size="small"
            style={{
              background: "rgb(240, 200, 7)",
              borderRadius: "25px",
              height: "35px",
              width: "250px",
              fontSize: "16px",
            }}
            onClick={onContinueBtnPress}
            loading={loading}
          >
            <Button
              key="continue"
              type="primary"
              disabled={nationalId.length !== 10}
              size="small"
              style={{
                background: "rgb(240, 200, 7)",
                borderRadius: "25px",
                height: "35px",
                width: "250px",
                fontSize: "16px",
              }}
              onClick={onContinueBtnPress}
              loading={loading}
            >
              ادامه
            </Button>
          </ProgressButton>
        </DialogActions> */}
    </div>
  );
}
