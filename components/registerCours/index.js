import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CoursRegisterStepper from "./Steps/CoursRegisterStepper";
import Description from "./Descriptions/Description";
import CoursSummery from "./Steps/CoursSummery";
import CoursTilte from "./Steps/CoursTilte";
import EssentialEquipment from "./Steps/EssentialEquipment";
import RecomendedEquipment from "./Steps/RecomendedEquipment";
import TransferInfo from "./Steps/TransferInfo";
import CoursSubjects from "./Steps/CoursSubjects";
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

function RegisterCoursForm({ editCours }) {
  const [activeComponent, setActiveComponent] = useState(1);
  const [submitCoursData, setSubmitCoursData] = useState({});
  const [completedData, setCompletedData] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    setCompletedData((prev) => ({ ...prev, ...submitCoursData }));
  }, [submitCoursData]);

  return (
    // <div>
    <CoursRegisterStepper
      editCours={editCours}
      disableBtn={disableBtn}
      completedData={completedData}
      submitCoursData={submitCoursData}
      setActiveComponent={setActiveComponent}
    >
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sm={12}
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
            <CoursTilte
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 2 && (
            <CoursSummery
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 3 && (
            <CoursSubjects
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 4 && (
            <EssentialEquipment
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 5 && (
            <TransferInfo
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 6 && (
            <StayingLocation
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 7 && (
            <UploadBanner
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 8 && (
            <EventAttending
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
          {activeComponent == 9 && (
            <CancelationRules
              editCours={editCours}
              setSubmitCoursData={setSubmitCoursData}
              setDisableBtn={setDisableBtn}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
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
    </CoursRegisterStepper>
    // </div>
  );
}

export default RegisterCoursForm;
