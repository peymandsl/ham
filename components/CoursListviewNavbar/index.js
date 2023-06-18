import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation, FreeMode } from "swiper";

import HardShipRating from "../listViewNavbarItems/HardShipRating";
import EventTypeFilter from "../listViewNavbarItems/TypeFilter";
import PriceRangeFilter from "../listViewNavbarItems/PriceRangeFilter";
import LastSecondFilter from "../listViewNavbarItems/LastSecondFilter";
import ClubProvienceFilter from "../ClubsListviewNavbar/ClubProvienceFilter";

function ClubsListviewNavbar() {
  return (
    <Box style={{ position: "fixed", zIndex: "1" }} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#D2001A", height: "52px" }}
      >
        <Toolbar
          style={{ minHeight: "50px", width: "100vw", overflow: "auto" }}
        >
          <Swiper
            freeMode={true}
            // slidesPerView={4}
            grid={{
              rows: 1,
            }}
            dir="rtl"
            lazy={true}
            spaceBetween={30}
            modules={[Grid, FreeMode]}
          >
            <SwiperSlide key="courses">
              <PriceRangeFilter status="courses" title="محدود قیمت" />
            </SwiperSlide>
            <SwiperSlide key="نوع برنامه">
              <EventTypeFilter title="نوع برنامه" />
            </SwiperSlide>
            <SwiperSlide key="میزان سختی">
              <HardShipRating title="میزان سختی" />
            </SwiperSlide>
            <SwiperSlide key="استان ها">
              <ClubProvienceFilter title=" استان ها" />
            </SwiperSlide>
            <SwiperSlide key="رزرو فوری">
              <LastSecondFilter title=" رزرو فوری" />
            </SwiperSlide>
          </Swiper>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ClubsListviewNavbar;
