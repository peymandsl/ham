import * as React from "react";

import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";

export default function AboutEvent({ event, cours, eventStatus }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ width: "100%", boxShadow: "none" }}>
      <>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            درباره {eventStatus ? event?.event_title : cours?.cours_title}
          </Typography>
          <Typography paragraph>
            {eventStatus ? event?.event_summery : cours?.cours_summery}
          </Typography>
        </CardContent>
        {(event?.event_summery_continue || cours?.cours_summery_continue) && (
          <>
            <IconButton
              aria-label="show more"
              aria-expanded={expanded}
              onClick={handleExpandClick}
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              ادامه ...
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {eventStatus
                    ? event?.event_summery_continue
                    : cours?.cours_summery_continue}
                </Typography>
              </CardContent>
            </Collapse>
          </>
        )}
      </>
    </Card>
  );
}
