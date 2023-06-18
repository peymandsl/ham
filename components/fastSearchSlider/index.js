import React from "react";
import Link from "next/link";
import { Col, Row, Typography } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";

import { Grid, Pagination, Navigation, FreeMode } from "swiper";

import FastSearchCard from "./FastSearchCard";

export default function FastSearchSlider() {
  const { Title } = Typography;

  const eventTypeList = [
    {
      type: "کوهنوردی",
      imgSrc: "/eventTypes/mountain.jpg",
      altText: "کوهنوردی",
    },
    {
      type: "جنگل گردی",
      imgSrc: "/eventTypes/forest.jpg",
      altText: "برنامه های جنگل گردی",
    },
    {
      type: "طبیعتگردی",
      imgSrc: "/eventTypes/hiking.jpg",
      altText: "برنامه های طبیعتگردی",
    },
    {
      type: "کویر نوردی",
      imgSrc: "/eventTypes/desert.jpg",
      altText: "برنامه های کویر نوردی",
    },
    {
      type: "غارنوردی",
      imgSrc: "/eventTypes/cave2.jpg",
      altText: "برنامه های غارنوردی",
    },
    {
      type: "سنگ نوردی",
      imgSrc: "/eventTypes/climbing2.jpg",
      altText: "برنامه های سنگ نوردی",
    },
    {
      type: "تنگه نوردی",
      imgSrc: "/eventTypes/1.jpg",
      altText: "برنامه های تنگه نوردی",
    },
    {
      type: "دوچرخه سواری",
      imgSrc: "/eventTypes/bycicle.jpg",
      altText: "برنامه های دوچرخه سواری",
    },
    { type: "اسکی", imgSrc: "/eventTypes/ski.jpg", altText: "اسکی" },
    {
      type: "گشت شهری",
      imgSrc: "/eventTypes/1.jpg",
      altText: "گشت شهری",
    },
  ];
  return (
    <Row
      style={{
        display: "block",
        background: "white",
      }}
    >
      <Col style={{ margin: "auto" }} xs={20} sm={20} md={20} lg={20}>
        <Title level={3} style={{ margin: "15px 0px 15px 0px" }}>
          جستجوی سریع
        </Title>
        <Swiper
          freeMode={true}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            530: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1300: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1770: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          grid={{
            rows: 1,
          }}
          dir="rtl"
          lazy={true}
          spaceBetween={30}
          modules={[Pagination, Navigation, Grid, FreeMode]}
        >
          {eventTypeList.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={`/events/type/${item.type}`}>
                <FastSearchCard
                  eventType={item.type}
                  altText={item.altText}
                  imgSrc={item.imgSrc}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  );
}
