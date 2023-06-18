import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { Skeleton } from "antd";

import EventInfo from "./EventInfo";
import AboutEvent from "./AboutEvent";
import RecomendedEq from "./RecomendedEq";
import EventServices from "./EventServices";
import CoursSubjects from "./CoursSubjects";
import NecceseryEquipment from "./NecceseryEquipment";
import EventEntertainments from "./EventEntertainments";
import EventEnteranceRules from "./EventEnteranceRules";
import EventStayingLocation from "./EventStayingLocation";
import EventCancelationRules from "./EventCancelationRules";

export default function RightDetailes({ event, cours }) {
  const [eventStatus, setEventStatus] = useState(false);
  const [coursStatus, setCoursStatus] = useState(false);
  useEffect(() => {
    setEventStatus(Object.keys(event).length > 0);
    setCoursStatus(Object.keys(cours).length > 0);
  }, [event, cours]);
  return (
    <Box style={{ marginLeft: "15px" }}>
      <Paper elevation={0}>
        <Box
          style={{ borderRadius: "10px" }}
          component="img"
          sx={{
            height: "400px",
            width: "100%",
          }}
          alt="event banner."
          src={
            eventStatus
              ? event?.eventBanner
                ? `/uploads/event_banners/${event?.eventBanner}`
                : "/uploads/event_banners/1.jpg"
              : cours?.coursBanner
              ? `/uploads/cours_banners/${cours?.coursBanner}`
              : "/uploads/cours_banners/1.jpg"
          }
        />
        {!eventStatus && !coursStatus ? (
          <>
            <Skeleton
              title
              active
              paragraph={{
                rows: 3,
              }}
            />
            <Divider variant="middle" />
            <Skeleton
              title
              active
              paragraph={{
                rows: 3,
              }}
            />
          </>
        ) : (
          <>
            <EventInfo eventStatus={eventStatus} event={event} cours={cours} />
            <Divider variant="middle" />
            <AboutEvent eventStatus={eventStatus} event={event} cours={cours} />
            <Divider variant="middle" />
            {eventStatus && <EventServices event={event} />}
            <Divider variant="middle" />
            {coursStatus && <CoursSubjects cours={cours} />}
            <Divider variant="middle" />
            <NecceseryEquipment
              eventStatus={eventStatus}
              event={event}
              cours={cours}
            />
            {eventStatus && <Divider variant="middle" />}{" "}
            {eventStatus && (
              <RecomendedEq
                eventStatus={eventStatus}
                event={event}
                cours={cours}
              />
            )}
            <Divider variant="middle" />
            {eventStatus && (
              <EventEntertainments eventStatus={eventStatus} event={event} />
            )}
            <Divider variant="middle" />
            <EventStayingLocation
              eventStatus={eventStatus}
              event={event}
              cours={cours}
            />
            <Divider variant="middle" />
            <EventEnteranceRules
              eventStatus={eventStatus}
              event={event}
              cours={cours}
            />
            <Divider variant="middle" />
            <EventCancelationRules
              eventStatus={eventStatus}
              event={event}
              cours={cours}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
