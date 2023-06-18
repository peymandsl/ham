import React from "react";
import Grid from "@mui/material/Grid";

import ListViewItem from "../../components/ListView/ListViewItem";

function ClubEvents({ ClubEvents }) {
  return (
    <Grid container spacing={2} justifyContent="space-between">
      {ClubEvents.map((item, i) => (
        <Grid
          style={{ margin: "10px 0px" }}
          key={i}
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <ListViewItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ClubEvents;
