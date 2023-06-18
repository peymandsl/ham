import React from "react";
import Grid from "@mui/material/Grid";
import { Skeleton } from "antd";

const LeftDetailesSkeleton = () => {
  return (
    <div>
      <Grid
        container
        style={{ marginBottom: "20px" }}
        justifyContent="space-between"
      >
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginBottom: "20px" }}
        justifyContent="space-between"
      >
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginBottom: "20px" }}
        justifyContent="space-between"
      >
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginBottom: "20px" }}
        justifyContent="space-between"
      >
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
        <Grid item>
          <Skeleton.Input active size="default" />
        </Grid>
      </Grid>
    </div>
  );
};

export default LeftDetailesSkeleton;
