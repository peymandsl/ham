import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MyWallet from "../../components/myWallet";
import BreadNav from "../../components/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import MassegeCard from "../../components/messageCard";
import { getSession, useSession } from "next-auth/react";
import { userRole } from "../../components/redux/features/userSlice";

function Messages({ messages, role }) {
  const { status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  if (status === "loading") {
    return (
      <Grid container style={{ height: "100vh" }}>
        <Grid item style={{ margin: "auto" }}>
          <Spin tip="Loading" size="large" />
        </Grid>
      </Grid>
    );
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <Box>
      <Paper elevation={0}>
        <Grid container direction="column">
          <Grid item>
            <BreadNav items={["خانه", "پیام ها"]} />
          </Grid>
          <Grid
            container
            style={{ width: "72%", margin: "auto", paddingTop: "15px" }}
          >
            <Box style={{ width: "100%" }}>
              <Card
                style={{
                  border: "none",
                  margin: "15px",
                  padding: "40px 0 40px 0",
                  borderRadius: "8px",
                  boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
                }}
                variant="outlined"
              >
                <MassegeCard messages={messages} />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Messages;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let userId = session?.token.restOfUser._id;
  const data = (
    await axios.post("http://localhost:3000/api/users/getMessages", {
      userId,
      resetCount: true,
    })
  ).data;

  if (!userId) {
    return {
      props: {
        role: "user",
        messages: data.messages,
      },
    };
  } else {
    const role = (
      await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
    ).data;
    return {
      props: {
        role: role,
        userID: userId,
        session: session,
        messages: data.messages,
      },
    };
  }
}
