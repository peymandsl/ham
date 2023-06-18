import React, { useState, useEffect } from "react";
import useGetRole from "../../hooks/useGetRole";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useStateWithDeps } from "swr/_internal";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import ListViewNavbar from "../../components/listViewNavbar";
import ListViewItem from "../../components/ListView/ListViewItem";
import { userRole } from "../../components/redux/features/userSlice";
import ResultPage from "../../components/globalComponents/ResultPage";
import ListViewItemShow from "../../components/ListView/ListViewItemShow";
import EventItemSkeleton from "../../components/globalComponents/skeleton/eventITemSkeleton";
import useWindowDimensions from "../../hooks/useWindowDimensions ";

const EventsList = ({ userID, role }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  const { width, height } = useWindowDimensions();
  const userData = useSelector((state) => state.userInfo.userData);
  const favoriteList = useSelector((state) => state.userInfo.favoriteList);
  const priceFilter = useSelector((state) => state.registerEvent.priceFilter);
  // const userID = userData?._id;
  const lastSecondFilter = useSelector(
    (state) => state.registerEvent.lastSecondFilter
  );
  const provienceFilter = useSelector(
    (state) => state.registerEvent.provienceFilter
  );
  const hardShipFilter = useSelector(
    (state) => state.registerEvent.hardShipFilter
  );
  const eventSort = useSelector((state) => state.registerEvent.eventSorted);
  const eventTypeFilter = useSelector(
    (state) => state.registerEvent.eventTypeFilter
  );
  const [events, setEvents] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [noData, setNoData] = useState(false);
  const [eventDataShow, setEventDataShow] = useState({});
  const [selectedEvent, setSelectedEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    role &&
      axios
        .post("/api/events", {
          role,
          userID,
          eventSort,
        })
        .then((res) => {
          if (res?.data.status == "SUCCESS") {
            setFilteredEvents([]);
            setEvents(res?.data?.data);
            setEventDataShow(res?.data?.data[0]);
          } else {
            setNoData(true);
          }
        });
  }, [eventSort, userID, role]);

  useEffect(() => {
    eventsList.length > 0 &&
      setEventDataShow(events.find((event) => event._id === selectedEvent));
    filteredEvents.length > 0 &&
      setEventDataShow(
        selectedEvent.find((event) => event._id === selectedEvent)
      );
  }, [selectedEvent]);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setEventsList(favoriteList);
      setEventDataShow(favoriteList[0]);
    } else if (filteredEvents.length > 0) {
      setEventsList(filteredEvents);
      setEventDataShow(filteredEvents[0]);
    } else {
      setEventsList(events);
      setEventDataShow(events[0]);
    }
  }, [favoriteList, events, filteredEvents]);
  //=========
  useEffect(() => {
    if (eventTypeFilter.length == 0) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(eventTypeFilter);
    }
  }, [eventTypeFilter]);
  //=========

  //=========
  useEffect(() => {
    if (hardShipFilter == 0) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(hardShipFilter);
    }
  }, [hardShipFilter]);
  //=======
  useEffect(() => {
    if (provienceFilter == 0) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(provienceFilter);
    }
  }, [provienceFilter]);
  //========
  useEffect(() => {
    if (lastSecondFilter == 0) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(lastSecondFilter);
    }
  }, [lastSecondFilter]);
  //========
  useEffect(() => {
    if (priceFilter == 0) {
      setFilteredEvents(events);
    } else {
    }
    setFilteredEvents(priceFilter);
  }, [priceFilter]);

  if (noData) {
    return (
      <ResultPage
        role={role}
        width="500"
        height="400"
        title="هنوز برنامه ای ثبت نشده!"
        src="/assets/empty-1.jpg"
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#FFCA03",
        }}
        linkHref="/registerEvent"
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
          style={{
            // position: width > 900 ? "fixed" : "static",
            margin: width > 900 ? "66px 0px 0px 0px" : "66px 20px 0px 20px",
            width: "100%",
          }}
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
        >
          {favoriteList?.length == 0 && events?.length == 0 ? (
            <EventItemSkeleton eventShow />
          ) : (
            Object.keys(eventDataShow).length !== 0 && (
              <ListViewItemShow width={width} selectedEvent={eventDataShow} />
            )
          )}
        </Grid>
        <Grid
          style={{
            marginTop: "48px",
            background: "#fbfbfb",
            padding: "20px",
            // marginLeft: "auto",
          }}
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
        >
          <Grid container spacing={2}>
            {favoriteList?.length == 0 && events?.length == 0 && (
              <>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <EventItemSkeleton />
                </Grid>
              </>
            )}
            {eventsList &&
              eventsList.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                  <ListViewItem
                    item={item}
                    setSelectedEvent={setSelectedEvent}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventsList;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = session?.token.restOfUser._id;

  const role = (
    await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
  ).data;

  if (!userId) {
    return {
      props: {
        role: "user",
      },
    };
  } else {
    return {
      props: {
        role: role,
        userID: userId,
        session: session,
      },
    };
  }
}
