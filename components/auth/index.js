import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { message } from "antd";
import PN from "persian-number";

import SignUp from "./signUp";
import SignIn from "./signIn";
import InputMobileNumber from "./InputMobileNumber";
import { authInputMobileNumber, kyc_id } from "../redux/features/userSlice";
import { useStateWithDeps } from "swr/_internal";
// عدم مطابقت اطلاعات
function SimpleDialog(props) {
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [nationalId, setNationalId] = useState(0);
  const [userBirthday, setUserBirthday] = useState("");
  const [userAuth, setUserAuth] = useState("INPUT_NUMBER");
  const [inputMobile, setInputMobile] = useState({ mobileNumber: "" });
  console.log(userAuth, "userAuth");
  console.log(userBirthday, "userBirthday");
  console.log(PN.convertEnToPe(nationalId), "nationalId");
  // const onchangeHanlder = (event) => {
  //   setNationalId(event.target.value);
  // };
  const onContinueBtnPress = () => {
    console.log("onContinueBtnPress clicked");
    setLoading(true);
    axios
      .post("/api/auth/kycCheck", {
        Mobile: "0" + inputMobile.mobileNumber,
        IdCode: PN.convertEnToPe(nationalId),
        BirthDate: userBirthday,
      })
      .then((res) => {
        if (res.data?.message) {
          messageApi.info(res.data.message);
        } else if (res.data?.Detail) {
          messageApi.info(res.data.Detail);
        }
        dispatch(kyc_id(res.data?.ID));
        setUserAuth(res.data.status);
        setLoading(false);
      });
  };
  const onMobileContinueBtnPress = () => {
    dispatch(authInputMobileNumber(inputMobile.mobileNumber));
    const mobile = "0" + inputMobile.mobileNumber;
    setLoading(true);
    axios
      .post("/api/auth", {
        mobile,
      })
      .then((res) => {
        setUserAuth(res.data.status);
        setLoading(false);
      });
  };
  return (
    <Modal
      open={open}
      title={
        userAuth == "INPUT_NUMBER"
          ? "ورود یا ثبت نام"
          : userAuth == "SIGN_IN"
          ? "ورود"
          : userAuth == "KYC_CHECK"
          ? "ثبت نام"
          : "ورود یا ثبت نام"
      }
      onOk={onClose}
      onCancel={onClose}
      footer={[
        (userAuth === "KYC_CHECK" || userAuth === "INPUT_NUMBER") && (
          <Button
            key="continue"
            type="primary"
            disabled={
              (userAuth === "KYC_CHECK" && nationalId.length !== 10,
              userAuth === "INPUT_NUMBER" &&
                inputMobile.mobileNumber.length !== 10)
            }
            size="small"
            style={{
              height: "35px",
              width: "100px",
              fontSize: "16px",
              borderRadius: "25px",
              background: "rgb(240, 200, 7)",
            }}
            onClick={
              userAuth == "KYC_CHECK"
                ? onContinueBtnPress
                : userAuth == "INPUT_NUMBER"
                ? onMobileContinueBtnPress
                : null
            }
            loading={loading}
          >
            ادامه
          </Button>
        ),
      ]}
    >
      {contextHolder}
      {userAuth === "INPUT_NUMBER" && (
        <InputMobileNumber
          inputMobile={inputMobile}
          setUserAuth={setUserAuth}
          setInputMobile={setInputMobile}
        />
      )}
      {userAuth === "SIGN_IN" && (
        <SignIn
          onClose={onClose}
          userAuth={userAuth}
          setUserAuth={setUserAuth}
        />
      )}
      {userAuth === "KYC_CHECK" && (
        <SignUp
          setUserBirthday={setUserBirthday}
          nationalId={nationalId}
          setUserAuth={setUserAuth}
          // onchangeHanlder={onchangeHanlder}
          setNationalId={setNationalId}
        />
      )}
      {userAuth === "KYC_CONFIRM" && (
        <SignIn
          onClose={onClose}
          userAuth={userAuth}
          setUserAuth={setUserAuth}
        />
      )}
    </Modal>
  );
}

export default function Login({ open, setOpenLogin }) {
  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
