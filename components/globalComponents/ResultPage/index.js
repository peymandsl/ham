import React from "react";
import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Result } from "antd";

const ResultPage = ({
  src,
  role,
  style,
  title,
  width,
  height,
  linkHref,
  subTitle,
  ButtonText,
}) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <Grid item>
      <Image width={width} height={height} src={src} alt="not found image" />
    </Grid>
    <Grid item>
      <Typography variant={"h4"}>{title}</Typography>
    </Grid>
    <Grid item style={{ marginBottom: "20px" }}>
      <Typography variant={"subtitle1"}>{subTitle}</Typography>
    </Grid>
    {(role == "club" || role == "admin") && (
      <Grid item>
        <Link href={linkHref} style={style}>
          {ButtonText}
        </Link>
      </Grid>
    )}
  </Grid>
);
export default ResultPage;
