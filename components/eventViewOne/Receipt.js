import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { getSession, useSession } from "next-auth/react";

import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import DiscountCode from "./DiscountCode";

function Receipt({ setRegisterStep, event, cours }) {
  const [finalPrice, setFinalPrice] = useState(event?.event_price || "");
  const [coursFinalPrice, setCoursFinalPrice] = useState(
    cours?.cours_price || ""
  );
  const { data, status } = useSession();

  const userData = data?.token.restOfUser;

  const stepHandler = () => {
    setRegisterStep("1");
  };
  let newEventParticipant = {
    event_id: event._id,
    participant: userData?._id,
    payment_price: finalPrice,
  };
  let newCoursParticipant = {
    cours_id: cours?._id,
    participant: userData?._id,
    payment_price: coursFinalPrice,
  };

  const onPaymentHandler = () => {
    event.length > 0
      ? axios.post("/api/eventPayment", newEventParticipant).then((res) => {
          if (res.status == 200) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
      : axios.post("/api/coursPayment", newCoursParticipant).then((res) => {
          if (res.status == 200) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        });
  };

  return (
    <Box style={{ position: "sticky", top: "80px" }}>
      <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={1}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/assets/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">باشگاه همنوردان جنوب</Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Card>
          <CardContent>
            <Paper>
              <Grid
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  background: "rgb(249, 249, 249)",
                  border: "1px dashed rgb(228, 228, 228)",
                }}
                container
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography>یک نفر</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    تومان{" "}
                    {event.length > 0
                      ? +event?.event_price?.toLocaleString("fa-IR")
                      : +cours?.cours_price?.toLocaleString("fa-IR")}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Divider variant="middle" />
            <Paper>
              <Grid
                container
                style={{ padding: "10px" }}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography>مجموع صورت حساب</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    تومان{" "}
                    {event.length > 0
                      ? +event?.event_price?.toLocaleString("fa-IR")
                      : +cours?.cours_price?.toLocaleString("fa-IR")}
                  </Typography>
                </Grid>
              </Grid>

              <Divider variant="middle" />

              <Grid
                style={{ padding: "10px" }}
                container
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography>مبلغ قابل پرداخت</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    تومان {(+finalPrice).toLocaleString("fa-IR")}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <DiscountCode
              discount_code={event ? event.discount_code : cours?.discount_code}
              discount_percent={
                event ? event?.discount_percent : cours.discount_percent
              }
              event_price={event && event?.event_price}
              cours_price={cours && cours?.cours_price}
              eventData={event}
              coursData={cours}
              setFinalPrice={setFinalPrice}
              setCoursFinalPrice={setCoursFinalPrice}
            />

            <Grid container style={{ marginTop: "6px" }} spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                  fullWidth
                  onClick={onPaymentHandler}
                  size="large"
                  variant="contained"
                  style={{ backgroundColor: "firebrick" }}
                >
                  پـرداخـت
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={stepHandler}
                  style={{ backgroundColor: "firebrick" }}
                >
                  انـصـراف
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}

export default Receipt;
