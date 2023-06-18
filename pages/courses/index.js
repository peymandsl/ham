import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import useGetRole from "../../hooks/useGetRole";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import ListViewNavbar from "../../components/listViewNavbar";
import ListViewItem from "../../components/ListView/ListViewItem";
import ResultPage from "../../components/globalComponents/ResultPage";
import { userRole } from "../../components/redux/features/userSlice";
import CoursListviewNavbar from "../../components/CoursListviewNavbar";
import ListViewItemShow from "../../components/ListView/ListViewItemShow";
import EventItemSkeleton from "../../components/globalComponents/skeleton/eventITemSkeleton";
import useWindowDimensions from "../../hooks/useWindowDimensions ";

const CoursesList = ({ role, userID }) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const favoriteList = useSelector((state) => state.userInfo.favoriteList);
  const priceFilter = useSelector((state) => state.coursInfo.priceFilter);

  const lastSecondFilter = useSelector(
    (state) => state.coursInfo.lastSecondFilter
  );
  const provienceFilter = useSelector(
    (state) => state.coursInfo.provienceFilter
  );
  const hardShipFilter = useSelector((state) => state.coursInfo.hardShipFilter);
  const eventSort = useSelector((state) => state.registerEvent.eventSorted);
  const coursTypeFilter = useSelector(
    (state) => state.coursInfo.coursTypeFilter
  );
  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [coursDataShow, setCoursDataShow] = useState({});
  const [selectedCours, setSelectedCours] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  useEffect(() => {
    role &&
      axios.post("/api/courses", { userID, eventSort, role }).then((res) => {
        if (res?.data?.status == "SUCCESS") {
          setCourses(res.data.data);
          setCoursDataShow(res.data.data[0]);
        } else {
          setNoData(true);
        }
      });
  }, [eventSort, role]);

  useEffect(() => {
    courses &&
      setCoursDataShow(courses.find((cours) => cours._id === selectedCours));
  }, [selectedCours]);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setCoursesList(favoriteList);
      setCoursDataShow(favoriteList[0]);
    } else if (filteredCourses.length > 0) {
      setCoursesList(filteredCourses);
    } else {
      setCoursesList(courses);
    }
  }, [favoriteList, courses, filteredCourses]);
  //=========
  useEffect(() => {
    if (coursTypeFilter.length == 0) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(coursTypeFilter);
    }
  }, [coursTypeFilter]);

  //=========
  useEffect(() => {
    if (hardShipFilter == 0) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(hardShipFilter);
    }
  }, [hardShipFilter]);
  //=======
  useEffect(() => {
    if (provienceFilter == 0) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(provienceFilter);
    }
  }, [provienceFilter]);
  //========
  useEffect(() => {
    if (lastSecondFilter == 0) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(lastSecondFilter);
    }
  }, [lastSecondFilter]);
  //========
  useEffect(() => {
    if (priceFilter == 0) {
      setFilteredCourses(courses);
    } else {
    }
    setFilteredCourses(priceFilter);
  }, [priceFilter]);

  if (noData) {
    return (
      <ResultPage
        role={role}
        width="500"
        height="400"
        title="هنوز دوره ای ثبت نشده !"
        src="/assets/empty-1.jpg"
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#FFCA03",
        }}
        linkHref="/registerCours"
        // subTitle="شما می توانید در "
        ButtonText="ایجاد دوره"
      />
    );
  }
  return (
    <div>
      <ListViewNavbar />
      <Grid
        container
        direction="row-reverse"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Grid
          className="hidden-mobile"
          style={{
            position: width > 900 ? "fixed" : "static",
            margin: width > 900 ? "66px 0px 0px 0px" : "66px 20px 0px 20px",
            width: "100%",
          }}
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
        >
          {favoriteList?.length == 0 && courses?.length == 0 ? (
            <EventItemSkeleton eventShow />
          ) : (
            coursDataShow && <ListViewItemShow selectedEvent={coursDataShow} />
          )}
        </Grid>
        <Grid
          style={{
            marginTop: "48px",
            background: "#fbfbfb",
            padding: "20px",
            marginLeft: "auto",
          }}
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
        >
          <Grid container spacing={2}>
            {favoriteList?.length == 0 && courses?.length == 0 && (
              <>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
              </>
            )}

            {favoriteList.length > 0
              ? favoriteList.map((item, i) => (
                  <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                    <ListViewItem
                      item={item}
                      setSelectedEvent={setSelectedCours}
                    />
                  </Grid>
                ))
              : coursesList &&
                coursesList.map((item, i) => (
                  <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                    <ListViewItem
                      item={item}
                      setSelectedEvent={setSelectedCours}
                    />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CoursesList;

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

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   let userId = session?.token.restOfUser._id;
//   if (!userId) {
//     return {
//       props: {
//         role: "user",
//       },
//     };
//   } else {
//     const role = (
//       await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
//     ).data;
//     return {
//       props: {
//         session: session,
//         role: role,
//         userID: userId,
//       },
//     };
//   }
// }
