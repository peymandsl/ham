import React from "react";
import { Skeleton } from "antd";
import PN from "persian-number";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function ClubInfo({ club }) {
  return (
    <Grid container>
      {!club ? (
        <Skeleton
          title
          active
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography gutterBottom variant="h5">
                باشگاه {club.club_name}
              </Typography>
            </Grid>
            {club.club_create_date && (
              <Grid item>
                <Typography variant="caption">
                  تاسیس: {PN.convertEnToPe(club.club_create_date)}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography style={{ margin: "15px 0px 15px 0px" }}>
              {club.club_description}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default ClubInfo;
