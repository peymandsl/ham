import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import stateList from "../../public/irn.json";

import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import InputSelectForm from "../../components/globalComponents/InputSelect";

function InputProvience({
  title,
  name,
  value,
  textFieldID,
  placeholder,
  tooltipIcon,
  tooltipTitle,
  tootipStyle,
  textFieldValue,
  onchangeHanlder,
}) {
  const userData = useSelector((state) => state.userInfo.userData);
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [user_provience, setUser_provience] = useState({});
  const [city, setCity] = useState([]);
  const mobile = userData.mobile;
  const [disableItem, setDisableItem] = useState(true);

  const { data, status } = useSession();
  const router = useRouter();

  const profileId = router.query.profileId
    ? router.query.profileId
    : data?.token.restOfUser._id;

  useEffect(() => {
    setUser_provience({ user_state: selectState, user_city: selectCity });
  }, [selectState, selectCity]);

  const onCheckHandler = () => {
    axios
      .post("/api/users/updateUser", {
        _id: profileId,
        updatedItem: user_provience,
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

  useEffect(() => {
    let filteredState = stateList.filter((item) => item.name == selectState);
    setSelectCity("");
    setCity(filteredState);
  }, [selectState]);

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
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputSelectForm
                disabled={disableItem}
                value={selectState}
                name="event_provience"
                placeHolder="استان "
                itemsList={stateList}
                setValue={setSelectState}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputSelectForm
                disabled={disableItem}
                value={selectCity}
                name="event_city"
                placeHolder="شهرستان"
                setValue={setSelectCity}
                itemsList={city[0]?.states}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InputProvience;
