import React from "react";
import Link from "next/link";
import { Col, Row, Typography } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";

import ProvinceEventsCard from "./ProvinceEventsCard";

import { Grid, Lazy, FreeMode } from "swiper";

export default function DiffrentEventsSlider() {
  const { Title } = Typography;

  const provienceList = [
    {
      provience: "بوشهر",
      imgSrc: "/assets/provience/boushehr3.jpg",
      altText: "استان بوشهر",
    },
    {
      provience: "گيلان",
      imgSrc: "/assets/provience/gilan2.jpg",
      altText: "استان گیلان",
    },
    {
      provience: "ايلام",
      imgSrc: "/assets/provience/yazd2.jpg",
      altText: "استان ايلام",
    },
    {
      provience: "گلستان",
      imgSrc: "/assets/provience/golestan2.jpg",
      altText: "استان گلستان",
    },
    {
      provience: "كرمان",
      imgSrc: "/assets/provience/yazd2.jpg",
      altText: "استان کرمان",
    },
    {
      provience: "فارس",
      imgSrc: "/assets/provience/shiraz2.jpg",
      altText: "استان فارس",
    },
    {
      provience: "اصفهان",
      imgSrc: "/assets/provience/isfahan2.jpg",
      altText: "استان اصفهان",
    },
    {
      provience: "تهران",
      imgSrc: "/assets/provience/tehran2.jpg",
      altText: "استان تهران",
    },
    {
      provience: "خوزستان",
      imgSrc: "/assets/provience/khuzestan2.jpg",
      altText: "استان خوزستان",
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
          برنامه های مختلف به تفکیک استان ها
        </Title>

        <Swiper
          freeMode={true}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            800: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1536: {
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
          modules={[Grid, FreeMode, Lazy]}
        >
          {provienceList.map((item, i) => (
            <SwiperSlide key={i} style={{ width: "210px" }}>
              <Link href={`/events/city/${item.provience}`}>
                <ProvinceEventsCard
                  provience={item.provience}
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
