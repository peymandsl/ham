import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { Col, Row, Typography } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation, FreeMode } from "swiper";
import LastSecondEventCard from "../lastSecondEvents/lastSecondEventCard";

export default function LearningEvents() {
  const { Title } = Typography;

  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    axios.post("/api/courses/learningCourses").then((res) => {
      if (res.data) {
        setCoursesList(res.data);
      } else {
        toast.error(res.data.message);
      }
    });
  }, []);
  return (
    <Row
      style={{
        width: "100%",
        display: "block",
        background: "white",
      }}
    >
      <Col style={{ margin: "auto" }} xs={20} sm={20} md={20} lg={20}>
        <Title level={3} style={{ margin: "15px 0px 15px 0px" }}>
          دوره های آمورشی
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
          {coursesList.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={`/events/${item._id}`}>
                <LastSecondEventCard
                  title={item.cours_type}
                  number="10"
                  altText="دوره های آموزشی"
                  imgSrc={`/uploads/cours_banners/${item.coursBanner}`}
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
  );
}
