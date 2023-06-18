import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import useGetRole from "../../hooks/useGetRole";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import FormTab from "../../components/globalComponents/FormTab";
import UserFormTable from "../../components/globalComponents/UserFormTable";
import ClubFormTable from "../../components/globalComponents/ClubFormTable";
import EventsFormTable from "../../components/globalComponents/EventsFormTable";
import CoursesFormTable from "../../components/globalComponents/CoursesFormTable";
import { userRole } from "../../components/redux/features/userSlice";

const Reports = ({ role }) => {
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);
  const { data, status } = useSession();
  let userID = data?.token.restOfUser._id;
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  let eventSort = "newest";
  useEffect(() => {
    axios.get("http://localhost:3000/api/users/getAllUsers").then((res) => {
      setUsers(res.data);
    });
    axios.get("http://localhost:3000/api/clubs/getAllClubs").then((res) => {
      setClubs(res.data);
    });
    axios
      .post("http://localhost:3000/api/events", {
        userID,
        eventSort,
        role,
      })
      .then((res) => {
        setEvents(res.data.data);
      });
    axios
      .post("http://localhost:3000/api/courses", {
        userID,
        eventSort,
        role,
      })
      .then((res) => {
        setCourses(res.data.data);
      });
  }, [userID, role]);

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
    <div style={{ marginTop: "8px" }}>
      <FormTab
        users={users && <UserFormTable filteredUsers={users} />}
        clubs={clubs && <ClubFormTable filteredClubs={clubs} />}
        events={
          events && (
            <EventsFormTable
              eventsList={events}
              setEventsList={setEventsList}
            />
          )
        }
        courses={
          courses && (
            <CoursesFormTable
              coursesList={courses}
              setEventsList={setEventsList}
            />
          )
        }
      />
    </div>
  );
};

export default Reports;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let userId = session?.token.restOfUser._id;
  const role = (
    await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
  ).data;
  console.log(session, "session");
  console.log(role, "role");
  if (!session || role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
      role: role,
    },
  };
}
