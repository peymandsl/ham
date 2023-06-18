import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ClubServicesList from "./ClubServicesList";
import InputSelectForm from "../../globalComponents/InputSelect";
import InputRadioForm from "../../globalComponents/InputRadioForm";

export default function ClubServices({
  setSubmitEventData,
  setDisableBtn,
  editEvent,
}) {
  const [eventServices, setEventServices] = useState({});
  const [clubServices, setClubServices] = useState({});
  const transferType = [
    { id: 1, value: "اتوبوس معمولی", label: "اتوبوس معمولی" },
    { id: 2, value: "اتوبوس VIP", label: "اتوبوس VIP" },
    { id: 3, value: "هواپیما", label: "هواپیما" },
    { id: 4, value: "قطار", label: "قطار" },
    { id: 5, value: "خودروی شخصی", label: "خودروی شخصی" },
    { id: 6, value: "دوچرخه", label: "دوچرخه" },
    { id: 7, value: "پیاده روی", label: "پیاده روی" },
  ];

  const meals = ["ندارد", "1 وعده", "2 وعده", "3 وعده", "4 وعده", "5 وعده"];

  const onchangeHanlder = (event) => {
    setEventServices((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  let club_services_items = { ...clubServices };
  clubServices, "clubServices";
  useEffect(() => {
    editEvent
      ? setEventServices({
          transfer_type: editEvent.transfer_type,
          club_service_description: editEvent.club_service_description,
          breakfast_service: editEvent.breakfast_service,
          lunch_service: editEvent.lunch_service,
          dinner_service: editEvent.dinner_service,
          mid_meal_service: editEvent.mid_meal_service,
        })
      : setEventServices({});
  }, [editEvent]);

  useEffect(() => {
    editEvent
      ? setClubServices(editEvent.club_services_items)
      : setEventServices({});
  }, [editEvent]);

  useEffect(() => {
    if (
      eventServices.breakfast_service &&
      eventServices.lunch_service &&
      eventServices.dinner_service &&
      eventServices.mid_meal_service &&
      eventServices.club_service_description &&
      eventServices.transfer_type &&
      Object.keys(clubServices).length !== 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData({ ...eventServices, club_services_items });
  }, [eventServices, clubServices]);

  return (
    <Grid container>
      <Grid item style={{ paddingBottom: "25px" }}>
        <Typography variant="h6">خدمات باشگاه</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
        >
          <Grid item>
            <Typography variant="h6">صبحانه</Typography>
          </Grid>
          <Grid item>
            <InputSelectForm
              onChange={onchangeHanlder}
              name="breakfast_service"
              value={eventServices.breakfast_service}
              placeHolder="صبحانه"
              itemsList={meals}
            />
          </Grid>
        </Grid>
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
        >
          <Grid item>
            <Typography variant="h6">نهار</Typography>
          </Grid>
          <Grid item>
            <InputSelectForm
              onChange={onchangeHanlder}
              name="lunch_service"
              value={eventServices.lunch_service}
              placeHolder="نهار"
              itemsList={meals}
            />
          </Grid>
        </Grid>
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
        >
          <Grid item>
            <Typography variant="h6">شام</Typography>
          </Grid>
          <Grid item>
            <InputSelectForm
              onChange={onchangeHanlder}
              value={eventServices.dinner_service}
              name="dinner_service"
              placeHolder="شام"
              itemsList={meals}
            />
          </Grid>
        </Grid>
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
        >
          <Grid item>
            <Typography variant="h6">میان وعده</Typography>
          </Grid>
          <Grid item>
            <InputSelectForm
              onChange={onchangeHanlder}
              name="mid_meal_service"
              value={eventServices.mid_meal_service}
              placeHolder="میان وعده"
              itemsList={meals}
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
          <Typography variant="h6"> توضیحات </Typography>
        </Grid>
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <TextField
            onChange={onchangeHanlder}
            name="club_service_description"
            fullWidth
            id="outlined-multiline-static"
            value={eventServices.club_service_description}
            multiline
            rows={2}
            placeholder="توضیحات وعده های پذیرایی "
          />
        </Grid>
      </Grid>
      <Grid style={{ paddingBottom: "25px" }} item>
        <Grid item>
          <Typography variant="h6">وسیله نقلیه</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <InputRadioForm
            name="transfer_type"
            onChange={onchangeHanlder}
            inputListItems={transferType}
            value={eventServices.transfer_type}
            // setInputRadioValue={setTravelDays}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          />
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
        {/* <Grid item>
          <Typography variant="h6"> توضیحات </Typography>
        </Grid> */}
        <Grid item style={{ padding: "20px 20px 0 20px" }}>
          <ClubServicesList
            clubServices={club_services_items}
            setClubServices={setClubServices}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
