import React from "react";
import { TiPhoneOutline } from "react-icons/ti";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function ContactForm({ userData }) {
  return (
    <Box>
      <Card
        style={{
          border: "none",
          margin: "15px",
          borderRadius: "8px",
          boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
        }}
        variant="outlined"
      >
        <React.Fragment>
          <CardContent>
            <Typography style={{ marginBottom: "15px" }} variant="h6">
              <TiPhoneOutline />
              اطلاعات تماس
            </Typography>
            <Grid container justifyContent="space-around">
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <Grid item>
                  <Typography variant="subtitle2">شماره موبایل</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    defaultValue={userData.mobile}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <Grid item>
                  <Typography variant="subtitle2">شماره اضطراری</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    defaultValue={userData.emergency_tell}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
