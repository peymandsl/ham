import React, { useState, useEffect } from "react";

import axios from "axios";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import ListViewNavbar from "../../../components/listViewNavbar";
import { userRole } from "../../../components/redux/features/userSlice";
import ListViewItem from "../../../components/ListView/ListViewItem";
import ResultPage from "../../../components/globalComponents/ResultPage";
import ListViewItemShow from "../../../components/ListView/ListViewItemShow";
import EventItemSkeleton from "../../../components/globalComponents/skeleton/eventITemSkeleton";

const EventsByType = ({ role }) => {
  const router = useRouter();
  const type = router.query.type;
  const [noData, setNoData] = useState(false);
  const userData = useSelector((state) => state.userInfo.userData);
  const favoriteList = useSelector((state) => state.userInfo.favoriteList);
  const priceFilter = useSelector((state) => state.registerEvent.priceFilter);
  const lastSecondFilter = useSelector(
    (state) => state.registerEvent.lastSecondFilter
  );
  const provienceFilter = useSelector(
    (state) => state.registerEvent.provienceFilter
  );
  const hardShipFilter = useSelector(
    (state) => state.registerEvent.hardShipFilter
  );
  const eventTypeFilter = useSelector(
    (state) => state.registerEvent.eventTypeFilter
  );
  const [events, setEvents] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [eventDataShow, setEventDataShow] = useState({});
  const [selectedEvent, setSelectedEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [event_owner_logo, setEvent_owner_logo] = useState("");

  useEffect(() => {
    type &&
      axios.post(`/api/events/getEventsByType/${type}`).then((res) => {
        if (res.data == 0) {
          setNoData(true);
        } else {
          setEvents(res.data);
          setSelectedEvent(res.data[0]?._id);
        }
      });
  }, [type]);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setEventsList(favoriteList);
    } else if (filteredEvents.length > 0) {
      setEventsList(filteredEvents);
    } else {
      setEventsList(events);
    }
  }, [favoriteList, events, filteredEvents]);

  useEffect(() => {
    if (eventTypeFilter.length == 0) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(eventTypeFilter);
    }
  }, [eventTypeFilter]);

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
    }
    const tempEvents = events.filter(
      (item) =>
        item.event_price >= priceFilter[0] && item.event_price <= priceFilter[1]
    );
    setFilteredEvents(tempEvents);
  }, [priceFilter]);

  useEffect(() => {
    events &&
      setEventDataShow(events.find((event) => event._id === selectedEvent));
  }, [selectedEvent]);

  if (noData) {
    return (
      <ResultPage
        width="500"
        height="400"
        title="هنوز برنامه ای ثبت نشده!"
        src="/assets/empty-1.jpg"
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#FFCA03",
        }}
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
            marginTop: "66px",
            position: "fixed",
            width: "100%",
          }}
          item
          // xs={12}
          // sm={4}
          md={4}
          lg={4}
        >
          {favoriteList.length == 0 && !eventDataShow ? (
            <EventItemSkeleton eventShow />
          ) : (
            Object.keys(eventDataShow).length !== 0 && (
              <ListViewItemShow
                event_owner_logo={event_owner_logo}
                selectedEvent={eventDataShow}
              />
            )
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
            {favoriteList?.length == 0 && events?.length == 0 && (
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
                      setSelectedEvent={setSelectedEvent}
                    />
                  </Grid>
                ))
              : eventsList &&
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

export default EventsByType;

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
