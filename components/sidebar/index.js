import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Avatar } from "antd";
import { toast } from "react-toastify";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { signOut } from "next-auth/react";
import Drawer from "@mui/material/Drawer";
import { useSession } from "next-auth/react";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import ListItem from "@mui/material/ListItem";
import useGetRole from "../../hooks/useGetRole";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MovingIcon from "@mui/icons-material/Moving";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { favoriteEventsList } from "../redux/features/userSlice";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

const drawerWidth = 240;
export default function Sidebar({ className, style }) {
  const dispatch = useDispatch();
  const { data } = useSession();
  const [messages, setMessages] = useState([]);

  const unreadMessages = messages.filter((item) => item.read == false);
  const userData = data?.token.restOfUser;
  const theme = useTheme();

  const userId = data?.token?.restOfUser?._id;
  const { data: role } = useGetRole({ userId });
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    userData &&
      axios
        .post("/api/users/getMessages", { userId: userData?._id })
        .then((res) => {
          setMessages(res.data.messages);
        });
  }, [userData]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const onSignout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("شما با موفقیت خارج شدید!");
  };

  const favoriteHandler = () => {
    axios.post("/api/users/getUser", { _id: userData?._id }).then((res) => {
      res.data.user_favorite_events &&
        dispatch(favoriteEventsList(res.data.user_favorite_events));
    });
  };

  const removeFavoriteHandler = () => {
    dispatch(favoriteEventsList([]));
  };

  return (
    <Box style={style} className={className} sx={{ display: "flex" }}>
      <div
        style={{
          border: "1px solid",
          borderRadius: "56px",
          paddingRight: "14px",
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          aria-label="open drawer"
          style={{ padding: "5px" }}
          onClick={handleDrawerOpen}
        >
          <MenuOutlined style={{ fontSize: "20px", marginLeft: "5px" }} />
          <UserOutlined style={{ fontSize: "20px", marginLeft: "5px" }} />
        </IconButton>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openDrawer}
        onClick={handleCloseDrawer}
      >
        <CssBaseline />

        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={openDrawer}
        >
          <Divider />
          <List>
            <Link href="/profile">
              <ListItem style={{ padding: "5px" }} key="profile" disablePadding>
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon style={{ alignItems: "center" }}>
                    {userData && (
                      <Avatar
                        style={{ marginLeft: "12px" }}
                        size={48}
                        src={
                          userData?.user_avatar
                            ? `/uploads/avatars/${userData?.user_avatar}`
                            : `https://secure.gravatar.com/avatar/${userData?._id}?s=90&d=identicon`
                        }
                      />
                    )}
                    <div>
                      <ListItemText inset primary="پروفایل" />
                      {userData && (
                        <ListItemText
                          inset
                          primary={
                            userData?.first_name + " " + userData?.last_name
                          }
                        />
                      )}
                    </div>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/">
              <ListItem
                style={{ padding: "5px" }}
                key="homePage"
                disablePadding
              >
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <HomeOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="صفحه اصلی"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/wallet">
              <ListItem style={{ padding: "5px" }} key="wallet" disablePadding>
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <CreditCardOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="کیف پول"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/events">
              <ListItem style={{ padding: "5px" }} key="events" disablePadding>
                <ListItemButton
                  onClick={removeFavoriteHandler}
                  style={{ borderRadius: "5px" }}
                >
                  <ListItemIcon>
                    <CreditCardOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="برنامه ها"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/clubs">
              <ListItem style={{ padding: "5px" }} key="clubs" disablePadding>
                <ListItemButton
                  onClick={removeFavoriteHandler}
                  style={{ borderRadius: "5px" }}
                >
                  <ListItemIcon>
                    <CreditCardOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="باشگاه ها"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/courses">
              <ListItem style={{ padding: "5px" }} key="courses" disablePadding>
                <ListItemButton
                  onClick={removeFavoriteHandler}
                  style={{ borderRadius: "5px" }}
                >
                  <ListItemIcon>
                    <CreditCardOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="دوره ها"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            {role == "admin" && (
              <Link href="/reports">
                <ListItem
                  style={{ padding: "5px" }}
                  key="events"
                  disablePadding
                >
                  <ListItemButton
                    onClick={removeFavoriteHandler}
                    style={{ borderRadius: "5px" }}
                  >
                    <ListItemIcon>
                      <CreditCardOutlinedIcon
                        style={{ fontSize: "26px", marginLeft: "10px" }}
                      />
                      <ListItemText
                        style={{ color: "rgb(51, 51, 51)" }}
                        inset
                        primary="گزارش ها"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            {role == "club" && (
              <Link href="/registerEvent">
                <ListItem
                  style={{ padding: "5px" }}
                  key="registerEvent"
                  disablePadding
                >
                  <ListItemButton style={{ borderRadius: "5px" }}>
                    <ListItemIcon>
                      <MovingIcon
                        style={{ fontSize: "26px", marginLeft: "10px" }}
                      />
                      <ListItemText
                        style={{ color: "rgb(51, 51, 51)" }}
                        inset
                        primary="ایجاد برنامه جدید"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            {role == "club" && (
              <Link href="/registerCours">
                <ListItem
                  style={{ padding: "5px" }}
                  key="registerCours"
                  disablePadding
                >
                  <ListItemButton style={{ borderRadius: "5px" }}>
                    <ListItemIcon>
                      <MovingIcon
                        style={{ fontSize: "26px", marginLeft: "10px" }}
                      />
                      <ListItemText
                        style={{ color: "rgb(51, 51, 51)" }}
                        inset
                        primary="ایجاد دوره جدید"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            <Link href="/messages">
              <ListItem
                style={{ padding: "5px" }}
                key="messages"
                disablePadding
              >
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <Stack spacing={2} direction="row">
                      <Badge badgeContent={unreadMessages.length} color="error">
                        <MailIcon
                          style={{ fontSize: "26px", marginLeft: "10px" }}
                          color="action"
                        />
                      </Badge>
                    </Stack>

                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="پیام ها"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/events">
              <ListItem
                style={{ padding: "5px" }}
                key="favorite"
                disablePadding
              >
                <ListItemButton
                  onClick={favoriteHandler}
                  style={{ borderRadius: "5px" }}
                >
                  <ListItemIcon>
                    <FavoriteBorderOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="علاقه مندی ها"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/profile">
              <ListItem style={{ padding: "5px" }} key="account" disablePadding>
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="حساب کاربری"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/support">
              <ListItem style={{ padding: "5px" }} key="support" disablePadding>
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <SupportAgentOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="پشتیبانی"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/rules">
              <ListItem style={{ padding: "5px" }} key="rules" disablePadding>
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <GavelOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="قوانین سایت"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/about-us">
              <ListItem style={{ padding: "5px" }} key="aboutUs" disablePadding>
                <ListItemButton style={{ borderRadius: "5px" }}>
                  <ListItemIcon>
                    <InfoOutlinedIcon
                      style={{ fontSize: "26px", marginLeft: "10px" }}
                    />
                    <ListItemText
                      style={{ color: "rgb(51, 51, 51)" }}
                      inset
                      primary="درباره ما"
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem style={{ padding: "5px" }} key="aboutUs" disablePadding>
              <ListItemButton
                onClick={onSignout}
                style={{ borderRadius: "5px" }}
              >
                <ListItemIcon>
                  <InfoOutlinedIcon
                    style={{ fontSize: "26px", marginLeft: "10px" }}
                  />
                  <ListItemText
                    style={{ color: "rgb(51, 51, 51)" }}
                    inset
                    primary="خروج"
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {/* </Link> */}
          </List>
        </Drawer>
      </Backdrop>
    </Box>
  );
}
