import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Row, Typography, Layout } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import { toast } from "react-toastify";
import { Grid, Pagination, Navigation, FreeMode } from "swiper";

import LastSecondEventCard from "./lastSecondEventCard";

export default function LastSecondEvents() {
  const { Content } = Layout;

  const { Title } = Typography;
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    axios.post("/api/events/lastsecondEvents").then((res) => {
      if (res.data.data) {
        setEventsList(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  }, []);
  return (
    <Content
      style={{
        width: "100%",
        height: "auto",
        margin: " 50px 0",
        backgroundSize: "150px",
        backgroundRepeat: "repeat",
        borderRadius: "16px 16px 0px 0px",
        backgroundImage: `linear-gradient(rgba(204, 0, 1, 0.75), rgb(204, 0, 1)), url("/assets/bg2.png")`,

        display: "flex",
        padding: "36px",
        justifyContent: "center",
        backgroundColor: "rgb(204, 0, 1)",
      }}
    >
      <Row
        style={{
          display: "block",
          width: "100%",
        }}
      >
        <Col style={{ margin: "auto" }} xs={20} sm={20} md={20} lg={20}>
          <Title level={3} style={{ margin: "15px 0px 15px 0px" }}>
            برنامه های لحظه اخری
          </Title>
          <Swiper
            freeMode={true}
            slidesPerView={4}
            grid={{
              rows: 1,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              580: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            dir="rtl"
            spaceBetween={30}
            modules={[Pagination, Navigation, Grid, FreeMode]}
          >
            {eventsList.map((item, i) => (
              <SwiperSlide key={i}>
                <Link href={`/events/${item._id}`}>
                  <LastSecondEventCard
                    title={item.event_type}
                    number="10"
                    altText="برنامه های کوهنوردی"
                    imgSrc={`/uploads/event_banners/${item.eventBanner}`}
                    startDate={item.startEventDate}
                    endDate={item.endEventDate}
                    city={item.selectState}
                    disscount={item.discount_percent}
                    last_second={item.last_second}
                    item={item}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Row>
    </Content>
  );
}
