import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputSelectForm from "../../globalComponents/InputSelect";
import ClubServicesList from "./ClubServicesList";
import InputRadioForm from "../../globalComponents/InputRadioForm";
import JalaliCalander from "../../globalComponents/JalaliCalander";
import JalaliTimePicker from "../../globalComponents/JalaliTimePicker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const days = [
  { id: 1, value: "1 روزه", label: "1 روزه" },
  { id: 2, value: "1.5 روزه", label: "1.5 روزه" },
  { id: 3, value: "2 روزه", label: "2 روزه" },
  { id: 4, value: "2.5 روزه", label: "2.5 روزه" },
  { id: 5, value: "3 روزه", label: "3 روزه" },
  { id: 6, value: "4 روز یا بیشتر", label: "4 روز یا بیشتر" },
];

export default function TransferInfo({
  setSubmitCoursData,
  setDisableBtn,
  editCours,
}) {
  const [statEvent, setStatEvent] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [endEvent, setEndEvent] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );

  const [travelStartTime, setTravelStartTime] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [travelInfo, setTravelInfo] = useState({});

  const onchangeHanlder = (event) => {
    setTravelInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  let startEventDate = !statEvent == "" ? statEvent.format() : statEvent;
  let endEventDate = !endEvent == "" ? endEvent.format() : endEvent;
  // let startEventDate = statEvent.format();
  // let endEventDate = endEvent.format();
  const date = new DateObject({ calendar: persian, date: startEventDate });
  useEffect(() => {
    if (
      travelInfo.travel_days &&
      travelInfo.tavel_start_description &&
      endEventDate &&
      startEventDate
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitCoursData({
      startEventDate,
      endEventDate,
      ...travelInfo,
    });
  }, [statEvent, endEvent, travelStartTime, travelInfo]);

  useEffect(() => {
    editCours
      ? (setStatEvent(""),
        setEndEvent(""),
        setTravelInfo({
          tavel_start_description: editCours.tavel_start_description,
          travel_days: editCours.travel_days,
        }))
      : setTravelInfo({});
  }, [editCours]);

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">اطلاعات جانبی دوره</Typography>
      </Grid>
      <Grid container>
        <Grid style={{ paddingBottom: "25px" }} item>
          <Grid item>
            <Typography variant="h6">مدت دوره</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <InputRadioForm
              name="travel_days"
              onChange={onchangeHanlder}
              inputListItems={days}
              value={travelInfo.travel_days}
              // setInputRadioValue={setTravelDays}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ paddingBottom: "30px" }}>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Grid item>
            <Typography variant="subtitle1">تاریخ شروع </Typography>
          </Grid>
          <Grid item>
            <JalaliCalander
              travelStartDate={statEvent}
              setTravelStartDate={setStatEvent}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Grid item>
            <Typography variant="subtitle1">تاریخ پایان </Typography>
          </Grid>
          <Grid item>
            <JalaliCalander
              travelStartDate={endEvent}
              setTravelStartDate={setEndEvent}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        style={{ paddingBottom: "25px" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid item>
          <Typography variant="h6"> توضیحات تکمیلی </Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            onChange={onchangeHanlder}
            name="tavel_start_description"
            value={travelInfo.tavel_start_description}
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={2}
            placeholder="جزییات نحوه و محل برگزاری دوره "
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
