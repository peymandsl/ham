import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function NavbarSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        width: "65%",
        alignItems: "center",
        borderRadius: "4px",
        marginRight: "15px",
      }}
    >
      <Skeleton
        animation="wave"
        height={50}
        width="8%"
        style={{ marginLeft: "15px" }}
      />
      <Skeleton
        animation="wave"
        height={50}
        width="15%"
        style={{ marginLeft: "15px" }}
      />
      <Skeleton
        animation="wave"
        height={50}
        width="15%"
        style={{ marginLeft: "15px" }}
      />
      <Skeleton
        animation="wave"
        height={50}
        width="15%"
        style={{ marginLeft: "15px" }}
      />
      <Skeleton
        animation="wave"
        height={50}
        width="15%"
        style={{ marginLeft: "15px" }}
      />
      <Skeleton
        animation="wave"
        height={50}
        width="15%"
        style={{ marginLeft: "15px" }}
      />
      <Skeleton animation="wave" variant="circular" width={50} height={40} />
    </div>
  );
}
