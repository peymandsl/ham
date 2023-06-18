import React, { useState, useEffect } from "react";
import RegisterEventForm from "../../../components/registerEventForm";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { userRole } from "../../../components/redux/features/userSlice";

function EditEvent({ editEvent, role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  return (
    <div>
      <RegisterEventForm editEvent={editEvent} />
    </div>
  );
}

export default EditEvent;

export async function getServerSideProps(context) {
  const { params } = context;
  const session = await getSession(context);

  let userId = session?.token.restOfUser._id;
  const editEvent = (
    await axios.get(
      `http://localhost:3000/api/events/getEvent/${params.eventId}`
    )
  ).data;

  if (!userId) {
    return {
      props: {
        role: "user",
        editEvent,
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
        editEvent,
      },
    };
  }
}
