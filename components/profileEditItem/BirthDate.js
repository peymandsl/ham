import React, { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DateObject from "react-date-object";
import Tooltip from "@mui/material/Tooltip";
import DatePicker from "react-multi-date-picker";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import { toast } from "react-toastify";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { getSession, useSession } from "next-auth/react";
import JalaliCalander from "../../components/globalComponents/JalaliCalander";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function BirthDate({
  title,
  value,
  editable,
  disabled,
  updatedItem,
  textFieldID,
  placeholder,
  tooltipIcon,
  tooltipTitle,
  tootipStyle,
}) {
  const [date_of_birth, setDate_of_birth] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  let formated = date_of_birth.format();
  const userData = useSelector((state) => state.userInfo.userData);
  const mobile = userData.mobile;
  const [disableItem, setDisableItem] = useState(true);

  const { data, status } = useSession();
  const router = useRouter();

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;

  const onCheckHandler = () => {
    axios
      .post("/api/users/updateUser", {
        _id: profileId,
        updatedItem: { date_of_birth },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.data);
        } else {
          toast.error(res.data);
        }
      });
    setDisableItem(true);
  };
  const onEditHandler = () => {
    setDisableItem(false);
  };
  return (
    <Grid
      item
      xs={10}
      sm={5}
      md={5}
      lg={5}
      style={{
        padding: "15px !important",
        marginLeft: "50px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="subtitle2">{title}</Typography>
          {tooltipTitle && (
            <Tooltip title={tooltipTitle}>
              <IconButton style={tootipStyle}>{tooltipIcon}</IconButton>
            </Tooltip>
          )}
        </Grid>
        {editable && (
          <Grid item>
            {!disableItem && (
              <Button
                onClick={onCheckHandler}
                aria-label="editIcon"
                id={textFieldID}
              >
                <CheckIcon aria-label="editIcon" />
              </Button>
            )}
            {disableItem && (
              <Button
                onClick={onEditHandler}
                aria-label="editIcon"
                id={textFieldID}
              >
                <ModeEditOutlinedIcon aria-label="editIcon" id={textFieldID} />
              </Button>
            )}
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={10} sm={5} md={5} lg={5}>
          <JalaliCalander
            disabled={disabled}
            // className="rmdp-mobile"
            travelStartDate={value || date_of_birth}
            setTravelStartDate={setDate_of_birth}
          />
          {/* <DatePicker
            disabled={disableItem}
            calendar={persian}
            locale={persian_fa}
            value={value}
            name="date_of_birth"
            onChange={setDate_of_birth}
            calendarPosition="bottom-right"
            plugins={[weekends()]}
            style={{
              height: "45px",
              borderRadius: "4px",
              fontSize: "14px",
              padding: "15px 10px",
              width: "190px",
            }}
          /> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BirthDate;
