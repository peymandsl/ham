import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";

import PriceRangeFilter from "../listViewNavbarItems/PriceRangeFilter";
import TypeFilter from "../listViewNavbarItems/TypeFilter";
import HardShipRating from "../listViewNavbarItems/HardShipRating";
import ProvienceFilter from "../listViewNavbarItems/ProvienceFilter";
import LastSecondFilter from "../listViewNavbarItems/LastSecondFilter";
import SortDropDown from "../../components/globalComponents/SortDropDown";

function ListViewNavbar() {
  const router = useRouter();
  return (
    <Box style={{ position: "fixed", zIndex: "1" }} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#D2001A", height: "52px" }}
      >
        <Toolbar
          style={{ minHeight: "50px", width: "100vw", overflow: "auto" }}
        >
          <SortDropDown status={router.pathname} />
          <PriceRangeFilter status={router.pathname} title="محدود قیمت" />
          <TypeFilter status={router.pathname} title="نوع برنامه" />
          <HardShipRating status={router.pathname} title="میزان سختی" />
          <ProvienceFilter status={router.pathname} title=" استان ها" />
          <LastSecondFilter status={router.pathname} title=" رزرو فوری" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ListViewNavbar;
