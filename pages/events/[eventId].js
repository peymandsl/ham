import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { Col, Row } from "antd";
import axios from "axios";

import BreadNav from "../../components/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import Receipt from "../../components/eventViewOne/Receipt";
import EventForm from "../../components/eventViewOne/EventForm";
import LeftDetailes from "../../components/eventViewOne/LeftDetailes";
import RightDetailes from "../../components/eventViewOne/RightDetailes";
import UserFormTable from "../../components/globalComponents/UserFormTable";
import { userRole } from "../../components/redux/features/userSlice";

function eventID({ role }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  const [registerStep, setRegisterStep] = useState("1");
  const userData = useSelector((state) => state.userInfo.userData);
  const [event, setEvent] = useState({});
  const eventID = router.query.eventId;

  useEffect(() => {
    eventID &&
      axios.post(`/api/events/getEvent/${eventID}`).then((res) => {
        setEvent(res.data);
      });
  }, [eventID]);

  return (
    <div>
      <Box>
        <Paper elevation={0}>
          <Row style={{ flexDirection: "column" }}>
            <Col>
              <BreadNav
                items={[
                  { href: "/", title: "خانه" },
                  { href: "/events", title: "برنامه ها" },
                  { title: `${event.event_title}` },
                ]}
              />
            </Col>
            <Row style={{ paddingTop: "15px" }}>
              <Col xs={1} sm={1} md={1} lg={1} xl={3}></Col>
              <Col xs={22} sm={22} md={22} lg={22} xl={18}>
                <Row>
                  <Col xs={24} sm={24} md={16} lg={17} xl={18}>
                    {registerStep === "1" && (
                      <RightDetailes event={event} cours={[]} />
                    )}
                    {registerStep === "2" && <EventForm />}
                    {registerStep === "3" && <UserFormTable event={event} />}
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={7} xl={6}>
                    {registerStep == "1" && (
                      <LeftDetailes
                        setRegisterStep={setRegisterStep}
                        registerStep={registerStep}
                        userData={userData}
                        event={event}
                        cours={[]}
                      />
                    )}
                    {registerStep === "2" && (
                      <Receipt
                        event={event}
                        setRegisterStep={setRegisterStep}
                      />
                    )}
                    {registerStep == "3" && (
                      <LeftDetailes
                        registerStep={registerStep}
                        userData={userData}
                        setRegisterStep={setRegisterStep}
                        event={event}
                        cours={[]}
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

export default eventID;

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
