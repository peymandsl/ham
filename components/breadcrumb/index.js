import React from "react";
import { Col, Row, Breadcrumb } from "antd";

const BreadNav = ({ items }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "36px",
          display: "flex",
          justifyContent: "start",
          backgroundSize: "150px",
          backgroundRepeat: "repeat",
          borderRadius: "16px 16px 0px 0px",
          backgroundColor: "rgb(240,200,7)",
          backgroundImage: `linear-gradient(rgba(240,200,7, 0.75), rgb(240,200,7)), url("/assets/bg2.png")`,
        }}
      >
        <Row>
          <Col>
            {/* <Breadcrumb separator="/">
              {items.map((item, i) => (
                <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb> */}
            <Breadcrumb separator=">" items={items} />
            {/* ); */}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default BreadNav;
