import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Col, Row } from "antd";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { favoriteEventsList } from "../redux/features/userSlice";

import LoginOrSignUp from "../auth";
import Sidebar from "../sidebar";

function HideOnScroll(props) {
  const { children, window } = props;
  const router = useRouter();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={router.pathname === "/" ? !trigger : true}
    >
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, status } = useSession();
  const userData = useSelector((state) => state.userInfo.userData);

  const logInOrRegister = useSelector(
    (state) => state.userInfo.logInOrRegister
  );
  const [openLogin, setOpenLogin] = useState(false);
  const CustomToastWithLink = () => (
    <div>
      <Link href="http://localhost:3000/profile">
        لطفا اطلاعات خود را از قسمت حساب کاربری تکمیل فرمایید
      </Link>{" "}
    </div>
  );

  function handleOpenLogin() {
    setOpenLogin(true);
  }

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const onclickNotification = () => {
    !userData?.club_name && toast.warning(CustomToastWithLink);
  };

  const removeFavoriteHandler = () => {
    dispatch(favoriteEventsList([]));
  };

  useEffect(() => {
    setOpenLogin(logInOrRegister);
  }, [logInOrRegister]);

  return (
    <React.Fragment>
      <LoginOrSignUp open={openLogin} setOpenLogin={setOpenLogin} />
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          style={{
            backgroundColor: router.pathname === "/" ? "transparent" : "white",
            boxShadow:
              router.pathname === "/"
                ? "none"
                : "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
          }}
        >
          <Row
            style={{ height: "64px", alignContent: "center", color: "black" }}
          >
            <Col xs={1} sm={1} md={1} lg={2}></Col>
            <Col xs={23} sm={23} md={22} lg={22}>
              <Sidebar className="menu" style={{ margin: "25px" }} />
              {status !== "loading" && (
                <Toolbar
                  className="hidden-mobile"
                  style={{
                    // margin: "auto",
                    // width: "74vw",
                    color: router.pathname === "/" ? "white" : "black",
                  }}
                >
                  <Sidebar />
                  {status === "authenticated" && userData ? (
                    <Typography
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                      }}
                    >
                      {userData?.club_name
                        ? "باشگاه" + " " + userData.club_name
                        : userData?.first_name + " " + userData?.last_name}
                    </Typography>
                  ) : (
                    <Button
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                      }}
                      color="inherit"
                      onClick={handleOpenLogin}
                    >
                      ورود / ثبت نام
                    </Button>
                  )}

                  <Button
                    href="/events"
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                    }}
                    color="inherit"
                    onClick={removeFavoriteHandler}
                  >
                    برنامه ها
                  </Button>
                  <Link onClick={removeFavoriteHandler} href="/clubs">
                    <Button
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                      }}
                      color="inherit"
                      onClick={removeFavoriteHandler}
                    >
                      باشگاه ها
                    </Button>
                  </Link>
                  <Link onClick={removeFavoriteHandler} href="/courses">
                    <Button
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                      }}
                      color="inherit"
                      onClick={removeFavoriteHandler}
                    >
                      دوره ها
                    </Button>
                  </Link>
                  <Link onClick={onclickNotification} href={"/wallet"}>
                    <Button
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                      }}
                      color="inherit"
                    >
                      کیف پول
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                      }}
                      color="inherit"
                    >
                      فروشگاه
                    </Button>
                  </Link>
                  <Button
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                    }}
                    color="inherit"
                  >
                    بلاگ
                  </Button>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <Link href="/">
                      <Image
                        src="/assets/home-icon.png"
                        alt="Picture of the author"
                        width={50}
                        height={50}
                        style={{ color: "white" }}
                      />
                    </Link>
                  </IconButton>
                </Toolbar>
              )}
            </Col>
          </Row>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
};

export default Navbar;
