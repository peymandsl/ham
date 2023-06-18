import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import EventRegisterStepper from "./Steps/EventRegisterStepper";
import Description from "./Descriptions/Description";
import EventTilte from "./Steps/EventTilte";
import EventSummery from "./Steps/EventSummery";
import ClubServices from "./Steps/ClubServices";
import EssentialEquipment from "./Steps/EssentialEquipment";
import RecomendedEquipment from "./Steps/RecomendedEquipment";
import TransferInfo from "./Steps/TransferInfo";
import StayingLocation from "./Steps/StayingLocation";
import Entertainments from "./Steps/Entertainments";
import CancelationRules from "./Steps/CancelationRules";
import EventAttending from "./Steps/EventAttending";
import UploadBanner from "./Steps/UploadBanner";
import CancalationDesc from "./Descriptions/CancalationDesc";
import EventTitleDesc from "./Descriptions/EventTitleDesc";
import ClubServiceDescr from "./Descriptions/ClubServiceDescr";
import EventSumDescr from "./Descriptions/EventSumDescr";
import EssentialEquDescr from "./Descriptions/EssentialEquDescr";
import RecomendedEqDescr from "./Descriptions/RecomendedEqDescr";
import TransferInfoDescr from "./Descriptions/TransferInfoDescr";
import StayingLocationDescr from "./Descriptions/StayingLocationDescr";
import EntertainmentDesc from "./Descriptions/EntertainmentDesc";
import EventAttendDescr from "./Descriptions/EventAttendDescr";
import UploadBannerDes from "./Descriptions/UploadBannerDes";

function RegisterEventForm({ editEvent }) {
  const [activeComponent, setActiveComponent] = useState(1);
  const [submitEventData, setSubmitEventData] = useState({});
  const [completedData, setCompletedData] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    setCompletedData((prev) => ({ ...prev, ...submitEventData }));
  }, [submitEventData]);
  return (
    // <div>
    <EventRegisterStepper
      editEvent={editEvent}
      disableBtn={disableBtn}
      completedData={completedData}
      submitEventData={submitEventData}
      setActiveComponent={setActiveComponent}
    >
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          style={{
            padding: "10px",
            border: "none",
            margin: "15px",
            borderRadius: "8px",
            boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
          }}
        >
          {activeComponent == 1 && (
            <EventTilte
              editEvent={editEvent}
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 2 && (
            <EventSummery
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 3 && (
            <ClubServices
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 4 && (
            <EssentialEquipment
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 5 && (
            <RecomendedEquipment
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 6 && (
            <TransferInfo
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 7 && (
            <StayingLocation
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 8 && (
            <Entertainments
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 9 && (
            <UploadBanner
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 10 && (
            <EventAttending
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
          {activeComponent == 11 && (
            <CancelationRules
              setSubmitEventData={setSubmitEventData}
              setDisableBtn={setDisableBtn}
              editEvent={editEvent}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Paper
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "none",
              margin: "15px",
              borderRadius: "8px",
              boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
            }}
            elevation={1}
          >
            {activeComponent == 1 && <EventTitleDesc />}
            {activeComponent == 2 && <EventSumDescr />}
            {activeComponent == 3 && <ClubServiceDescr />}
            {activeComponent == 4 && <EssentialEquDescr />}
            {activeComponent == 5 && <RecomendedEqDescr />}
            {activeComponent == 6 && <TransferInfoDescr />}
            {activeComponent == 7 && <StayingLocationDescr />}
            {activeComponent == 8 && <EntertainmentDesc />}
            {activeComponent == 9 && <UploadBannerDes />}
            {activeComponent == 10 && <EventAttendDescr />}
            {activeComponent == 11 && <CancalationDesc />}
          </Paper>
        </Grid>
      </Grid>
    </EventRegisterStepper>
    // </div>
  );
}

export default RegisterEventForm;
