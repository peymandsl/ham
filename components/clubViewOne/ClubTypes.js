import React from "react";
import { Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { Skeleton } from "antd";
import { Space, Tag } from "antd";
import { IoBicycleSharp } from "react-icons/io";
import { MdOutlineDownhillSkiing } from "react-icons/md";
import {
  GiBus,
  GiHiking,
  GiValley,
  GiDesert,
  GiForestCamp,
  GiCircleForest,
  GiUndergroundCave,
  GiMountainClimbing,
} from "react-icons/gi";
const ClubTypes = ({ clubEventTypes, title }) => {
  return (
    <Grid container>
      <Grid container justifyContent="flex-start">
        <Space size={[0, 8]} wrap style={{ marginBottom: "15px" }}>
          {clubEventTypes.map((item, i) => (
            <Tag
              color="orangered"
              style={{ fontSize: "16px" }}
              key={i}
              icon={
                item == "سنگ نوردی" ? (
                  <GiMountainClimbing />
                ) : item == "کوهنوردی" ? (
                  <GiHiking />
                ) : item == "جنگل گردی" ? (
                  <GiCircleForest />
                ) : item == "طبیعتگردی" ? (
                  <GiForestCamp />
                ) : item == "کویر نوردی" ? (
                  <GiDesert />
                ) : item == "غارنوردی" ? (
                  <GiUndergroundCave />
                ) : item == "تنگه نوردی" ? (
                  <GiValley />
                ) : item == "گشت شهری" ? (
                  <GiBus />
                ) : (
                  (item = "دوچرخه سواری" ? <IoBicycleSharp /> : "")
                )
              }
            >
              {item}
            </Tag>
          ))}
        </Space>
      </Grid>
      {/* )} */}
    </Grid>
  );
};

export default ClubTypes;
