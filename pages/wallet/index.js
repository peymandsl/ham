import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MyWallet from "../../components/myWallet";
import BreadNav from "../../components/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import { userRole } from "../../components/redux/features/userSlice";

function Wallet({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  return (
    <Box>
      <Paper elevation={0}>
        <Grid container direction="column">
          <Grid item>
            <BreadNav items={["خانه", "کیف پول"]} />
          </Grid>
          <Grid
            item
            style={{ width: "72%", margin: "auto", paddingTop: "15px" }}
          >
            <MyWallet />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Wallet;

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
