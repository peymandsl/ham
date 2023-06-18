import React, { useState, useEffect } from "react";
import InputRadioForm from "../../globalComponents/InputRadioForm";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { red } from "@mui/material/colors";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import stateList from "../../../public/irn.json";
import eventsName from "../../../public/eventsName.json";
import RatingStar from "../../globalComponents/RatingStar";
import BasicTooltip from "../../globalComponents/BasicTooltip";
import InputSelectForm from "../../globalComponents/InputSelect";
import JalaliCalander from "../../globalComponents/JalaliCalander";

let inputListItems = eventsName;

export default function EventTilte({
  setSubmitEventData,
  setDisableBtn,
  editEvent,
}) {
  const event_owner = useSelector((state) => state.userInfo.userData?._id);
  const [selectCity, setSelectCity] = useState("");
  const [city, setCity] = useState([]);
  const [eventTitle, setEventTitle] = useState({});
  const [register_deadline_date, setRegister_deadline_date] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  let register_deadline =
    !register_deadline_date == ""
      ? register_deadline_date.format()
      : register_deadline_date;

  const hardShipLabels = {
    1: "خیلی آسان",
    2: "آسان",
    3: "متوسط",
    4: "سخت",
    5: "خیلی سخت",
  };

  useEffect(() => {
    editEvent
      ? (setEventTitle({
          event_title: editEvent.event_title,
          discount_code: editEvent.discount_code,
          discount_percent: editEvent.discount_percent,
          event_price: editEvent.event_price,
          event_capacity: editEvent.event_capacity,
          selectState: editEvent.selectState,
          selectCity: editEvent.selectCity,
          event_type: editEvent.event_type,
          peak_height: editEvent.peak_height,
          hard_ship: editEvent.hard_ship,
          peak_name: editEvent.peak_name,
        }),
        setRegister_deadline_date(""))
      : setEventTitle({});
  }, [editEvent]);

  useEffect(() => {
    let filteredState = stateList.filter(
      (item) => item.name == eventTitle.selectState
    );
    setSelectCity("");
    setCity(filteredState);
  }, [eventTitle.selectState]);

  const onchangeHanlder = (event) => {
    setEventTitle((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeLastSecond = (e) => {
    setEventTitle((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const listItems = {
    ...eventTitle,
    register_deadline,
    event_owner,
  };
  useEffect(() => {
    if (
      (eventTitle.discount_code
        ? eventTitle.discount_code && eventTitle.discount_percent
        : true) &&
      (eventTitle.event_type == "کوهنوردی"
        ? eventTitle.peak_height && eventTitle.peak_name
        : true) &&
      eventTitle.event_title &&
      eventTitle.event_price &&
      eventTitle.event_capacity &&
      eventTitle.selectState &&
      eventTitle.selectCity &&
      eventTitle.event_type &&
      !register_deadline_date == ""
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitEventData({ ...listItems });
  }, [eventTitle, register_deadline, event_owner]);

  return (
    <div>
      <Grid container justifyContent="space-around">
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
        >
          <Grid item style={{ paddingRight: "5px" }}>
            <Typography variant="subtitle1">عنوان برنامه</Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              value={eventTitle.event_title || ""}
              name="event_title"
              onChange={onchangeHanlder}
              id="outlined-basic"
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
        >
          <Grid item style={{ paddingRight: "5px" }}>
            <Typography variant="subtitle1">هزینه برنامه</Typography>
          </Grid>
          <Grid
            container
            style={{ display: "flex", flexFlow: "row", alignItems: "center" }}
          >
            <Grid
              item
              style={{
                paddingLeft: "10px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.25)",
                height: "40px",
              }}
            >
              <Paper
                component="form"
                style={{ boxShadow: "none" }}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  // width: 400,
                }}
              >
                <InputBase
                  style={{ width: "100%" }}
                  onChange={onchangeHanlder}
                  value={eventTitle.event_price || ""}
                  name="event_price"
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                />
                <Typography variant="body1">تومان</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-around">
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
        >
          <Grid
            item
            style={{
              display: "flex",
              paddingRight: "5px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="subtitle1">کد تخفیف</Typography>
            <BasicTooltip
              tooltipTitle="اگر برای این برنامه تخفیف در نظر دارد کد دلخواه خود را وارد کنید"
              tooltipIcon={<ErrorTwoToneIcon />}
              tootipStyle={{ color: "#FF5403" }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              size="small"
              variant="outlined"
              id="outlined-basic"
              name="discount_code"
              onChange={onchangeHanlder}
              value={eventTitle.discount_code || ""}
            />
          </Grid>
        </Grid>
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
        >
          <Grid
            item
            style={{
              display: "flex",
              paddingRight: "5px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="subtitle1">درصد تخفیف</Typography>
            <BasicTooltip
              tooltipTitle="درصد تخفیف در نظر گرفته خود را برای کد تخفیف اینجا وارد کنید"
              tooltipIcon={<ErrorTwoToneIcon />}
              tootipStyle={{ color: "#FF5403" }}
            />
          </Grid>
          <Grid
            container
            style={{ display: "flex", flexFlow: "row", alignItems: "center" }}
          >
            <Grid
              item
              style={{
                paddingLeft: "10px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.25)",
                height: "40px",
              }}
            >
              <Paper
                component="form"
                style={{ boxShadow: "none" }}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  size="small"
                  variant="outlined"
                  id="outlined-basic"
                  name="discount_percent"
                  sx={{ ml: 1, flex: 1 }}
                  style={{ width: "100%" }}
                  onChange={onchangeHanlder}
                  value={eventTitle.discount_percent || ""}
                />
                <Typography variant="body1">درصد</Typography>
              </Paper>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-around">
        <Grid
          style={{ paddingBottom: "25px" }}
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
        >
          <Grid
            item
            style={{
              display: "flex",
              paddingRight: "5px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="subtitle1">ظرفیت برنامه </Typography>
            <BasicTooltip
              tooltipTitle="ظرفیت تعداد نغرات شرکت کننده در برنامه"
              tooltipIcon={<ErrorTwoToneIcon />}
              tootipStyle={{ color: "#FF5403" }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              size="small"
              variant="outlined"
              id="outlined-basic"
              name="event_capacity"
              onChange={onchangeHanlder}
              value={eventTitle.event_capacity || ""}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Grid item style={{ paddingRight: "5px" }}>
            <Typography variant="subtitle1">مهلت ثبت نام </Typography>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            <JalaliCalander
              travelStartDate={register_deadline_date}
              setTravelStartDate={setRegister_deadline_date}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-around">
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          style={{ alignSelf: "flex-end", padding: "12px 0 12px 0" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventTitle.last_second || false}
                  name="last_second"
                  onChange={handleChangeLastSecond}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: red[900],
                    "&.Mui-checked": {
                      color: red[800],
                    },
                  }}
                />
              }
              label="تور لحظه آخری"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Grid item>
            <Typography variant="subtitle1">میزان سختی</Typography>
          </Grid>
          <Grid item>
            <RatingStar
              name="hard_ship"
              value={+eventTitle.hard_ship || 1}
              labels={hardShipLabels}
              onChange={onchangeHanlder}
            />
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Grid>

      <Grid item style={{ paddingBottom: "25px", paddingRight: "5px" }}>
        <Grid item style={{ paddingRight: "22px" }}>
          <Typography variant="subtitle1">نوع برنامه</Typography>
        </Grid>
        <Grid item>
          <InputRadioForm
            inputListItems={inputListItems}
            onChange={onchangeHanlder}
            value={eventTitle.event_type || ""}
            name="event_type"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          />
        </Grid>
      </Grid>

      {eventTitle.event_type == "کوهنوردی" && (
        <Grid container justifyContent="space-around">
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Grid
              item
              style={{
                display: "flex",
                paddingRight: "5px",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="subtitle1">نام قله </Typography>
              <BasicTooltip
                tooltipTitle="نام کامل قله را وارد کنید"
                tooltipIcon={<ErrorTwoToneIcon />}
                tootipStyle={{ color: "#FF5403" }}
              />
            </Grid>
            <Grid item style={{ paddingLeft: "10px", width: "100%" }}>
              <TextField
                style={{ width: "100%" }}
                size="small"
                variant="outlined"
                id="outlined-basic"
                name="peak_name"
                onChange={onchangeHanlder}
                value={eventTitle.peak_name || ""}
              />
            </Grid>
          </Grid>
          <Grid
            style={{ paddingBottom: "25px" }}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
          >
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                paddingRight: "5px",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="subtitle1">ارتفاع قله</Typography>
              <BasicTooltip
                tooltipTitle="درصورتی که کوهنوردی را انتخاب کرده اید، لطفا ارتفاع قله را نیز مشخص کنید"
                tooltipIcon={<ErrorTwoToneIcon />}
                tootipStyle={{ color: "#FF5403" }}
              />
            </Grid>
            <Grid
              container
              style={{ display: "flex", flexFlow: "row", alignItems: "center" }}
            >
              <Grid item style={{ paddingLeft: "10px", width: "100%" }}>
                <TextField
                  style={{ width: "100%" }}
                  size="small"
                  variant="outlined"
                  id="outlined-basic"
                  name="peak_height"
                  onChange={onchangeHanlder}
                  value={eventTitle.peak_height || ""}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">متر</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid container justifyContent="space-between">
        <Grid
          item
          style={{
            display: "flex",
            paddingRight: "22px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="subtitle1">انتخاب موقعیت</Typography>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid
            style={{ paddingBottom: "25px" }}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
          >
            <InputSelectForm
              value={eventTitle.selectState}
              name="selectState"
              placeHolder="استان "
              itemsList={stateList}
              onChange={onchangeHanlder}
            />
          </Grid>
          <Grid
            style={{ paddingBottom: "25px", width: "88%" }}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
          >
            <InputSelectForm
              widthProp="100%"
              value={eventTitle.selectCity || selectCity}
              name="selectCity"
              placeHolder="شهرستان"
              onChange={onchangeHanlder}
              itemsList={city[0]?.states}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
