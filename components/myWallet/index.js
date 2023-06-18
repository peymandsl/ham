import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Withdrawal from "./Withdrawal";
import RegisterGift from "./RegisterGift";
import Typography from "@mui/material/Typography";
import RegisterBankAccount from "./RegisterBankAccount";

function MyWallet() {
  return (
    <Box style={{ width: "100%" }}>
      <Card
        style={{
          border: "none",
          margin: "15px",
          padding: "40px 0 40px 0",
          borderRadius: "8px",
          boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
        }}
        variant="outlined"
      >
        <Grid container justifyContent="space-around">
          <Grid
            container
            item
            style={{ marginBottom: "30px" }}
            justifyContent="space-around"
            xs={12}
            sm={5}
            md={5}
            lg={5}
          >
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <Typography> موجودی قابل برداشت </Typography>
            </Grid>
            <Grid
              item
              style={{ margin: "0 2px 0 2px" }}
              xs={12}
              sm={3}
              md={3}
              lg={3}
            >
              <hr
                style={{
                  borderRight: 0,
                  borderBottom: 0,
                  borderLeft: 0,
                  borderTop: "1px dashed rgb(153, 153, 153)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Typography>100000</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            style={{ marginBottom: "30px" }}
            justifyContent="space-around"
            xs={12}
            sm={5}
            md={5}
            lg={5}
          >
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <Typography> موجودی بلوکه شده </Typography>
            </Grid>
            <Grid
              item
              style={{ margin: "0 2px 0 2px" }}
              xs={12}
              sm={3}
              md={3}
              lg={3}
            >
              <hr
                style={{
                  borderRight: 0,
                  borderBottom: 0,
                  borderLeft: 0,
                  borderTop: "1px dashed rgb(153, 153, 153)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Typography>100000</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            style={{ marginBottom: "30px" }}
            justifyContent="space-around"
            xs={12}
            sm={5}
            md={5}
            lg={5}
          >
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <Typography> مجموع پرداختی ها </Typography>
            </Grid>
            <Grid
              item
              style={{ margin: "0 2px 0 2px" }}
              xs={12}
              sm={3}
              md={3}
              lg={3}
            >
              <hr
                style={{
                  borderRight: 0,
                  borderBottom: 0,
                  borderLeft: 0,
                  borderTop: "1px dashed rgb(153, 153, 153)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Typography>100000</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            style={{ marginBottom: "30px" }}
            justifyContent="space-around"
            xs={12}
            sm={5}
            md={5}
            lg={5}
          >
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <Typography> اعتبار هدیه </Typography>
            </Grid>
            <Grid
              item
              style={{ margin: "0 2px 0 2px" }}
              xs={12}
              sm={3}
              md={3}
              lg={3}
            >
              <hr
                style={{
                  borderRight: 0,
                  borderBottom: 0,
                  borderLeft: 0,
                  borderTop: "1px dashed rgb(153, 153, 153)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Typography>100000</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          style={{ marginBottom: "30px" }}
          justifyContent="space-around"
          xs={12}
          sm={12}
          md={12}
          lg={12}
        >
          <Grid
            item
            style={{ margin: "0 2px 0 2px" }}
            xs={12}
            sm={3}
            md={3}
            lg={3}
          >
            <Withdrawal />
          </Grid>
          <Grid
            item
            style={{ margin: "0 2px 0 2px" }}
            xs={12}
            sm={3}
            md={3}
            lg={3}
          >
            <RegisterGift />
          </Grid>
          <Grid
            item
            style={{ margin: "0 2px 0 2px" }}
            xs={12}
            sm={3}
            md={3}
            lg={3}
          >
            <RegisterBankAccount />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default MyWallet;
