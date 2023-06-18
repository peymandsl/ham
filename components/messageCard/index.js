import React from "react";
import "moment/locale/fa";
import moment from "moment";
import { useSession } from "next-auth/react";

moment.locale("fa");

import { Avatar, List, Space } from "antd";
import { useEffect, useState } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const MessageCard = ({ messages }) => {
  const { data: data2 } = useSession();

  const userData = data2?.token.restOfUser;

  return (
    <div
      id="scrollableDiv"
      style={{
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={messages}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item
            key={item.created}
            actions={[
              <IconText
                icon={FieldTimeOutlined}
                text={moment(item.created).fromNow()}
                key="list-vertical-star-o"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={
                  item.event
                    ? `/uploads/event_banners/${item.event?.eventBanner}`
                    : `/uploads/cours_banners/${item.cours?.coursBanner}`
                }
              />
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    item.event
                      ? `/uploads/avatars/${item.event?.event_owner.user_avatar}`
                      : `/uploads/avatars/${item.cours?.cours_owner.user_avatar}`
                  }
                />
              }
              title={
                <a
                  href={
                    item.event
                      ? `/events/${item.event?._id}`
                      : `/events/${item.cours?._id}`
                  }
                >
                  {item.event
                    ? item.event?.event_title
                    : item.cours?.cours_title}
                </a>
              }
              description={
                item.event
                  ? item.event?.event_owner.club_name
                  : item.cours?.cours_owner.club_name
              }
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};
export default MessageCard;
