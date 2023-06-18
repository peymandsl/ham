import React, { useState, useEffect } from "react";
import RegisterEventForm from "../../components/registerEventForm";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { userRole } from "../../components/redux/features/userSlice";

function RegisterEvent({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  return (
    <div>
      <RegisterEventForm />
    </div>
  );
}

export default RegisterEvent;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = session?.token.restOfUser._id;

  const role = (
    await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
  ).data;

  if (!session || role == "user") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!userId) {
    return {
      props: {
        role: "user",
      },
    };
  } else {
    // const role = (
    //   await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
    // ).data;
    return {
      props: {
        session: session,
        role: role,
        userID: userId,
      },
    };
  }
}
