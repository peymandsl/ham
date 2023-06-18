import React, { useState, useEffect } from "react";
import { Col, Row, Typography, Button } from "antd";

import axios from "axios";
import PN from "persian-number";
import { signIn } from "next-auth/react";

import AuthCode from "react-auth-code-input";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./SignIn.module.css";

export default function SignIn({ onContinueBtnPress, onClose, userAuth }) {
  const { Text, Title } = Typography;
  const userMobile = useSelector((state) => state.userInfo.mobile);
  const kyc_id = useSelector((state) => state.userInfo.kyc_id);
  const [inputAuthCode, setInputAuthCode] = useState("");

  const mobile = userMobile;
  const handleOnChange = (res) => {
    setInputAuthCode(res);
  };

  const reNewAuthCode = () => {
    axios
      .post("/api/randomKey", {
        mobile,
      })
      .then((res) => {
        toast.success(res.data.message);
      });
  };

  const authState = { inputAuthCode, mobile };
  useEffect(() => {
    inputAuthCode.length == 6 &&
      userAuth == "SIGN_IN" &&
      signIn("credentials", {
        ...authState,
        redirect: false,
      })
        .then((response) => {
          if (response.ok) {
            toast.success("شما با موفقیت وارد شدید!");
            onClose(true);
          } else {
            toast.error("مشکلی رخ داده است!");
          }
        })
        .catch((error) => {
          toast.error("مشکلی رخ داده است!");
        });
  }, [inputAuthCode, userAuth]);

  useEffect(() => {
    inputAuthCode.length == 6 &&
      userAuth == "KYC_CONFIRM" &&
      axios
        .post("/api/auth/kycResult", {
          OTP: inputAuthCode,
          ID: kyc_id,
        })
        .then((res) => {
          if (res?.data?.result?.Result?.message) {
            toast.error(res?.data?.result?.Result?.message);
          } else {
            signIn("credentials", {
              ...res?.data?.result?.Result,
              redirect: false,
            })
              .then((response) => {
                if (response.ok) {
                  toast.success("شما با موفقیت وارد شدید!");
                  onClose(true);
                } else {
                  toast.error("مشکلی رخ داده است!");
                }
              })
              .catch((error) => {
                toast.error("مشکلی رخ داده است!");
              });
          }
        });
  }, [inputAuthCode, userAuth]);

  useEffect(() => {
    userAuth == "SIGN_IN" && reNewAuthCode();
  }, [userAuth]);

  return (
    <>
      <div style={{ width: "600px" }}>
        <div id="input mobile number" style={{ marginBottom: "10px" }}>
          <Row justifyContent="space-between">
            <Col>
              <Title level={3} style={{ color: "#404040" }}>
                {PN.convertEnToPe(userMobile)}
              </Title>
            </Col>
          </Row>
        </div>
        <Row
          // container
          alignItems="center"
          justifyContent="space-between"
          style={{ marginBottom: "20px" }}
        >
          <Col>
            <Title
              level={5}
              // gutterBottom
              // component={"span"}
              style={{ fontSize: "18px", fontWeight: "600", color: "#404040" }}
            >
              کد فعال سازی
            </Title>
          </Col>
          <Col style={{ direction: "ltr" }}>
            <AuthCode
              onChange={handleOnChange}
              allowedCharacters="numeric"
              inputClassName={styles.input}
              containerClassName={styles.container}
            />
          </Col>
        </Row>
        <Row justifyContent="space-between">
          <Col>
            <Button onClick={reNewAuthCode} danger>
              ارسال کد
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
