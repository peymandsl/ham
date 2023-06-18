import React from "react";
import Link from "next/link";
import PN from "persian-number";
import { Skeleton } from "antd";
import { BsPerson } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { BsLink45Deg } from "react-icons/bs";
import { RiWhatsappLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { TbFileCertificate } from "react-icons/tb";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function ClubLeftdetailes({ club, userData }) {
  const {
    _id,
    logo,
    last_name,
    club_name,
    first_name,
    user_state,
    user_avatar,
    telegram_id,
    club_events,
    club_website,
    insta_profile,
    certificate_No,
    whatsapp_number,
  } = club;
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
              src={
                user_avatar
                  ? `/uploads/avatars/${user_avatar}`
                  : `https://secure.gravatar.com/avatar/${_id}?s=90&d=identicon`
              }
              sx={{ width: 75, height: 75 }}
            />
          </Grid>
          <Grid item style={{ margin: "10px 0px" }}>
            {!club_name ? (
              <Skeleton.Input active size="small" />
            ) : (
              <Typography variant="h6"> باشگاه {club_name}</Typography>
            )}
          </Grid>
        </Grid>
        <Divider variant="middle" />

        {!first_name && <Skeleton />}
        {first_name && (
          <Grid
            container
            style={{ margin: "20px 0px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <BsPerson style={{ fontSize: "18px" }} /> سرپرست باشگاه:{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {first_name + " " + last_name}
              </Typography>
            </Grid>
          </Grid>
        )}
        {user_state && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <GrLocation style={{ fontSize: "18px" }} />
                موقعیت:
              </Typography>
            </Grid>
            <Grid item style={{ display: "flex" }}>
              <Typography variant="body1">{user_state}</Typography>
            </Grid>
          </Grid>
        )}
        {whatsapp_number && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <RiWhatsappLine /> واتساپ:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {PN.convertEnToPe(whatsapp_number)}
              </Typography>
            </Grid>
          </Grid>
        )}
        {telegram_id && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <FaTelegramPlane /> تلگرام:
              </Typography>
            </Grid>
            <Grid item>
              {telegram_id && (
                <Link href={`https://t.me/${telegram_id}`}>
                  <Typography variant="body1">{telegram_id}</Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        )}
        {insta_profile && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <IoLogoInstagram /> صفحه اینستاگرام:
              </Typography>
            </Grid>
            <Grid item>
              {insta_profile && (
                <Link href={`https://instagram.com/${insta_profile}`}>
                  <Typography variant="body1">{insta_profile}</Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        )}
        {club_website && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <BsLink45Deg /> آدرس وبسایت:
              </Typography>
            </Grid>
            <Grid item>
              {club_website && (
                <Link href={`https://${club_website}`}>
                  <Typography variant="body1">{club_website}</Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        )}
        {certificate_No && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <TbFileCertificate /> شماره مجوز:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {PN.convertEnToPe(certificate_No)}
              </Typography>
            </Grid>
          </Grid>
        )}
        {club_events && (
          <Grid
            container
            style={{ marginBottom: "20px" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="body1">
                <HiOutlineDocumentDuplicate /> تعداد برنامه ها:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {PN.convertEnToPe(club_events.length)}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
