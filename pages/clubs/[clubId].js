import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import InputBase from "@mui/material/InputBase";
import BreadNav from "../../components/breadcrumb";
import { Col, Row } from "antd";

import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import ClubLeftdetailes from "../../components/clubViewOne/ClubLeftdetailes";
import ClubRightDetailes from "../../components/clubViewOne/ClubRightDetailes";
import { userRole } from "../../components/redux/features/userSlice";

function clubID({ role }) {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userInfo.userData);
  const [clubInfo, setClubInfo] = useState([]);
  const router = useRouter();
  const clubId = router.query.clubId;
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  useEffect(() => {
    clubId &&
      axios.get(`/api/clubs/getClubInfo/${clubId}`).then((res) => {
        setClubInfo(res.data);
      });
  }, [clubId]);
  return (
    <div>
      <Box>
        <Paper elevation={0}>
          <Row style={{ flexDirection: "column" }}>
            <Col>
              <BreadNav
                items={[
                  { href: "/", title: "خانه" },
                  { href: "/clubs", title: "باشگاه ها" },
                  { title: `${clubInfo.club_name}` },
                ]}
              />
            </Col>
            <Row style={{ paddingTop: "15px" }}>
              <Col xs={1} sm={1} md={1} lg={1} xl={3}></Col>
              <Col xs={22} sm={22} md={22} lg={22} xl={18}>
                <Row>
                  <Col xs={24} sm={24} md={16} lg={17} xl={18}>
                    <ClubRightDetailes club={clubInfo} />
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={7} xl={6}>
                    <ClubLeftdetailes userData={userData} club={clubInfo} />
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

export default clubID;

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
