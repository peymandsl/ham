import React from "react";
import Box from "@mui/material/Box";
import ContactForm from "./ContactForm";
import Paper from "@mui/material/Paper";
import PassengerInfo from "./PassengerInfo";
import { useSession } from "next-auth/react";

function EventForm() {
  const { data } = useSession();

  const userData = data?.token.restOfUser;
  return (
    <Box style={{ marginLeft: "15px" }}>
      <Paper elevation={0}>
        <ContactForm userData={userData} />
        <PassengerInfo userData={userData} />
      </Paper>
    </Box>
  );
}

export default EventForm;
