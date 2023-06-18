import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import useGetRole from "../../hooks/useGetRole";
import { getSession, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";

export default function ProvinceEventsCard({
  provience,
  altText,
  imgSrc,
  events,
}) {
  const [eventCount, setEventCount] = useState(0);
  const { data, status } = useSession();

  const userId = data?.token?.restOfUser?._id;
  const role = useSelector((state) => state.userInfo.userRole);

  useEffect(() => {
    axios
      .post("/api/events/eventsByProvience", { selectState: provience, role })

      .then((res) => {
        if (res?.data?.data) {
          setEventCount(res?.data?.data);
        } else {
          toast.error(res.data.message);
        }
      });
  }, [provience]);

  return (
    <Card
      style={{ boxShadow: "none", margin: "16px 2px 16px 0px" }}
      sx={{ maxWidth: 345 }}
    >
      <div style={{ display: "flex", width: "240px", alignItems: "center" }}>
        <div style={{ paddingLeft: "10px" }}>
          <Image
            src={imgSrc}
            alt={altText}
            width={140}
            height={140}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div>
          <Typography
            style={{ fontWeight: "bolder" }}
            variant="h6"
            color="text.secondary"
          >
            {provience}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {eventCount == 0 ? "برنامه ای یافت نشد" : `${eventCount} برنامه`}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
