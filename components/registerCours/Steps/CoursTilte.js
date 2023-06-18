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

export default function CoursTilte({
  setSubmitCoursData,
  setDisableBtn,
  editCours,
}) {
  const userInfo = useSelector((state) => state.userInfo);
  const cours_owner = useSelector((state) => state.userInfo.userData?._id);
  const [last_second, setLast_second] = useState(false);
  const [certificate, setCertificate] = useState(false);
  // const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [city, setCity] = useState([]);
  const [coursTitle, setCoursTitle] = useState({});
  const [hardShipRate, HardShipRate] = useState(1);
  const [register_deadline_date, setRegister_deadline_date] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  // let register_deadline = register_deadline_date.format();

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
    editCours
      ? (setCoursTitle({
          hard_ship: editCours.hard_ship,
          cours_type: editCours.cours_type,
          selectCity: editCours.selectCity,
          cours_price: editCours.cours_price,
          selectState: editCours.selectState,
          cours_title: editCours.cours_title,
          discount_code: editCours.discount_code,
          cours_capacity: editCours.cours_capacity,
          discount_percent: editCours.discount_percent,
          cours_instructor: editCours.cours_instructor,
        }),
        setRegister_deadline_date(""),
        setLast_second(editCours.last_second),
        setCertificate(editCours.certificate))
      : setCoursTitle({});
  }, [editCours]);

  useEffect(() => {
    let filteredState = stateList.filter(
      (item) => item.name == coursTitle.selectState
    );
    setSelectCity("");
    setCity(filteredState);
  }, [coursTitle.selectState]);

  const onchangeHanlder = (event) => {
    setCoursTitle((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeLastSecond = () => {
    setLast_second(!last_second);
  };
  const handleChangeCertificate = () => {
    setCertificate(!certificate);
  };
  const listItems = {
    ...coursTitle,
    // selectState,
    // selectCity,
    // last_second,
    cours_owner,
    certificate,
    register_deadline,
  };

  useEffect(() => {
    if (
      // (coursTitle.discount_code
      //   ? coursTitle.discount_code && coursTitle.discount_percent
      //   : true) &&
      coursTitle.cours_title &&
      coursTitle.cours_price &&
      coursTitle.cours_capacity &&
      coursTitle.cours_instructor &&
      register_deadline &&
      coursTitle.selectState &&
      coursTitle.selectCity &&
      coursTitle.cours_type
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    setSubmitCoursData(listItems);
  }, [coursTitle, last_second, cours_owner, certificate, register_deadline]);

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
            <Typography variant="subtitle1">عنوان دوره</Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              value={coursTitle.cours_title || ""}
              name="cours_title"
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
            <Typography variant="subtitle1">هزینه دوره</Typography>
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
                  value={coursTitle.cours_price || ""}
                  name="cours_price"
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
          <Grid item style={{ paddingRight: "5px" }}>
            <Typography variant="subtitle1">مدرس دوره</Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              value={coursTitle.cours_instructor || ""}
              name="cours_instructor"
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
          <Grid
            item
            style={{
              display: "flex",
              paddingRight: "5px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="subtitle1">ظرفیت دوره </Typography>
            <BasicTooltip
              tooltipTitle="ظرفیت تعداد نغرات شرکت کننده در دوره"
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
              name="cours_capacity"
              onChange={onchangeHanlder}
              value={coursTitle.cours_capacity || ""}
            />
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
            <Typography variant="subtitle1">کد تحفیف</Typography>
            <BasicTooltip
              tooltipTitle="اگر برای این دوره تخفیف در نظر دارد کد دلخواه خود را وارد کنید"
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
              value={coursTitle.discount_code || ""}
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
                  // width: 400,
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
                  value={coursTitle.discount_percent || ""}
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
                  checked={last_second}
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
              label="ثبت نام لحظه آخری"
            />
          </FormGroup>
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
                  checked={certificate}
                  onChange={handleChangeCertificate}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: red[900],
                    "&.Mui-checked": {
                      color: red[800],
                    },
                  }}
                />
              }
              label="همراه با صدور گواهینامه معتبر"
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
              value={+coursTitle.hard_ship || 1}
              labels={hardShipLabels}
              onChange={onchangeHanlder}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ paddingBottom: "25px", paddingRight: "5px" }}>
        <Grid item style={{ paddingRight: "22px" }}>
          <Typography variant="subtitle1">نوع دوره</Typography>
        </Grid>
        <Grid item>
          <InputRadioForm
            inputListItems={inputListItems}
            onChange={onchangeHanlder}
            value={coursTitle.cours_type || ""}
            name="cours_type"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          />
        </Grid>
      </Grid>

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
              value={coursTitle.selectState}
              name="selectState"
              placeHolder="استان "
              itemsList={stateList}
              onChange={onchangeHanlder}

              // setValue={setSelectState}
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
              value={coursTitle.selectCity || selectCity}
              name="selectCity"
              placeHolder="شهرستان"
              onChange={onchangeHanlder}
              // setValue={setSelectCity}
              itemsList={city[0]?.states}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
