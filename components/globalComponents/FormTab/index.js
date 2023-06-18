import React from "react";
import { Tabs } from "antd";

const FormTab = ({ users, clubs, events, courses }) => {
  const onChange = (key) => {};

  const items = [
    {
      key: "users",
      label: `کاربران`,
      children: users,
    },
    {
      key: "clubs",
      label: `باشگاه ها`,
      children: clubs,
    },
    {
      key: "events",
      label: `برنامه ها`,
      children: events,
    },
    {
      key: "courses",
      label: `دوره ها`,
      children: courses,
    },
  ];
  return (
    <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
  );
};
export default FormTab;
