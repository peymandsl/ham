import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
import Box from "@mui/material/Box";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import BreadNav from "../../components/breadcrumb";
import Receipt from "../../components/eventViewOne/Receipt";
import EventForm from "../../components/eventViewOne/EventForm";
import LeftDetailes from "../../components/eventViewOne/LeftDetailes";
import { userRole } from "../../components/redux/features/userSlice";
import RightDetailes from "../../components/eventViewOne/RightDetailes";
import UserFormTable from "../../components/globalComponents/UserFormTable";

function coursID({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  const router = useRouter();
  const [registerStep, setRegisterStep] = useState("1");
  const userData = useSelector((state) => state.userInfo.userData);

  const [cours, setCours] = useState([]);
  const coursID = router.query.coursId;
  useEffect(() => {
    coursID &&
      axios.post(`/api/courses/getCours/${coursID}`).then((res) => {
        setCours(res.data);
      });
  }, [coursID]);

  return (
    <div>
      <Box>
        <Paper elevation={0}>
          <Row style={{ flexDirection: "column" }}>
            <Col>
              <BreadNav
                items={[
                  { title: "خانه" },
                  { title: "برنامه ها" },
                  { title: `${cours.cours_title}` },
                ]}
              />
            </Col>
            <Row style={{ paddingTop: "15px" }}>
              <Col xs={1} sm={1} md={1} lg={1} xl={3}></Col>

              <Col xs={22} sm={22} md={22} lg={22} xl={18}>
                <Row>
                  <Col xs={24} sm={24} md={16} lg={17} xl={18}>
                    {registerStep === "1" && (
                      <RightDetailes cours={cours} event={[]} />
                    )}
                    {registerStep === "2" && <EventForm />}
                    {registerStep === "3" && <UserFormTable cours={cours} />}
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={7} xl={6}>
                    {(registerStep == "1" || registerStep == "3") && (
                      <LeftDetailes
                        setRegisterStep={setRegisterStep}
                        registerStep={registerStep}
                        userData={userData}
                        cours={cours}
                        event={{}}
                      />
                    )}

                    {registerStep === "2" && (
                      <Receipt
                        event={[]}
                        cours={cours}
                        setRegisterStep={setRegisterStep}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} xl={3}></Col>
            </Row>
          </Row>
        </Paper>
      </Box>
    </div>
  );
}

export default coursID;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let userId = session?.token.restOfUser._id;
  if (!userId) {
    return {
      props: {
        role: "user",
      },
    };
  } else {
    const role = (
      await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
    ).data;
    return {
      props: {
        session: session,
        role: role,
        userID: userId,
      },
    };
  }
}
