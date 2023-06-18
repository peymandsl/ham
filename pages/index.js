import React, { useState, useEffect } from "react";

import Head from "next/head";
import { Grid } from "@mui/material";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import LastSecondEvents from "../components/lastSecondEvents";
import SearchField from "../components/searchField";
import FastSearch from "../components/fastSearchSlider";
import LearningEvents from "../components/learningEvents";
import DiffrentEventsSlider from "../components/provinceEventsSlider";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import HomeLandingPage from "../components/homeLandingPage";
import { userRole } from "../components/redux/features/userSlice";

export default function Home({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Hamnavard</title>
        <meta name="description" content="Hamnavard" />
        <script
          src="https://kit.fontawesome.com/f0bf060259.js"
          crossorigin="anonymous"
        ></script>
        <link rel="shortcut icon" href="#"></link>
      </Head>

      <main className={styles.main} style={{ fontFamily: "iransans" }}>
        <div style={{ position: "absolute", top: "0px", right: "0px" }}>
          <SearchField />
          <Grid container style={{ width: "98.9vw" }} justifyContent="center">
            <DiffrentEventsSlider />
            <FastSearch />
            <LastSecondEvents />
            <LearningEvents />
          </Grid>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

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
