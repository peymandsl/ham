import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import { FaUser } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function PassengerInfo({ userData }) {
  return (
    <Box>
      <Card
        style={{
          border: "none",
          boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
          borderRadius: "8px",
          margin: "15px",
        }}
        variant="outlined"
      >
        <React.Fragment>
          <CardContent>
            <Typography style={{ marginBottom: "15px" }} variant="h6">
              <FaUser />
              اطلاعات شخصی
            </Typography>
            <Grid container justifyContent="space-around">
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <Grid item>
                  <Typography variant="subtitle2">نام </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    defaultValue={userData.first_name}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <Grid item>
                  <Typography variant="subtitle2">نام خانوادگی</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    defaultValue={userData.last_name}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{ marginTop: "15px" }}
                item
                xs={12}
                sm={5}
                md={5}
                lg={5}
              >
                <Grid item>
                  <Typography variant="subtitle2">کد ملی</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    defaultValue={userData.national_id}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{ marginTop: "15px" }}
                item
                xs={12}
                sm={5}
                md={5}
                lg={5}
              >
                <Grid item>
                  <FormControl>
                    <FormLabel id="genderSelect">جنسیت</FormLabel>
                    <RadioGroup
                      defaultValue="male"
                      name="radio-buttons-group"
                      aria-labelledby="genderSelect"
                      style={{ flexDirection: "row" }}
                      value={userData.user_gender}
                    >
                      <FormControlLabel
                        value="male"
                        disabled
                        control={<Radio />}
                        label="آقا"
                      />
                      <FormControlLabel
                        disabled
                        value="female"
                        control={<Radio />}
                        label="خانم"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
