import React, { useEffect } from "react";
import axios from "axios";
import RegisterCoursForm from "../../components/registerCours";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { userRole } from "../../components/redux/features/userSlice";

function RegisretCours({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);
  return (
    <div>
      <RegisterCoursForm />
    </div>
  );
}

export default RegisretCours;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || role !== "admin" || role !== "club") {
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
