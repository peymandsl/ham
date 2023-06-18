import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import RegisretCours from "../../../components/registerCours";
import { userRole } from "../../../components/redux/features/userSlice";

function EditEvent({ editCours, role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  return (
    <div>
      <RegisretCours editCours={editCours} />
    </div>
  );
}

export default EditEvent;

export async function getServerSideProps(context) {
  const { params } = context;
  const session = await getSession(context);
  let userId = session?.token.restOfUser._id;

  const editCours = (
    await axios.get(
      `http://localhost:3000/api/courses/getCours/${params.coursId}`
    )
  ).data;
  if (!userId) {
    return {
      props: {
        role: "user",
        editCours,
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
        editCours,
      },
    };
  }
}
