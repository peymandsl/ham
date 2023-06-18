import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function EventItemSkeleton({ eventShow }) {
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={12}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={12} width="40%" />}
      />
      <Skeleton
        sx={{ height: eventShow ? "300px" : 190 }}
        animation="wave"
        variant="rectangular"
      />
      <CardContent>
        {eventShow ? (
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Skeleton
                animation="wave"
                height={15}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Skeleton
                animation="wave"
                height={15}
                width="60%"
                style={{ marginBottom: 6 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Skeleton
                animation="wave"
                height={15}
                width="90%"
                style={{ marginBottom: 6 }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Skeleton
                animation="wave"
                height={15}
                width="70%"
                style={{ marginBottom: 6 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Skeleton
                animation="wave"
                height={15}
                width="90%"
                style={{ marginBottom: 6 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Skeleton
                animation="wave"
                height={15}
                width="60%"
                style={{ marginBottom: 6 }}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
