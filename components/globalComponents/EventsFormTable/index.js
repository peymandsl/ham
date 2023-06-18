import React, { useState, useRef } from "react";
import Link from "next/link";
import InputDropDown from "./InputDropDown";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Space, Tag, Button, Input, Table } from "antd";

const EventsFormTable = ({ eventsList, setEventsList }) => {
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          // placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            پاک کردن
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            فیلتر
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "عنوان برنامه",
      dataIndex: "eventTitle",
      key: "eventTitle",
      ...getColumnSearchProps("eventTitle"),
      render: (_, record) => (
        <Link href={`/events/${record.key}`}>{record.eventTitle}</Link>
      ),
    },
    {
      title: "نام باشگاه",
      dataIndex: "club_name",
      key: "club_name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("club_name"),
    },
    {
      title: "نوع برنامه",
      dataIndex: "eventType",
      key: "eventType",
      render: (text) => <a>{text}</a>,
      filters: [
        {
          text: "کوهنوردی",
          value: "کوهنوردی",
        },
        {
          text: "جنگل گردی",
          value: "جنگل گردی",
        },
        {
          text: "طبیعتگردی",
          value: "طبیعتگردی",
        },
        {
          text: "کویر نوردی",
          value: "کویر نوردی",
        },
        {
          text: "غارنوردی",
          value: "غارنوردی",
        },
        {
          text: "سنگ نوردی",
          value: "سنگ نوردی",
        },
        {
          text: "تنگه نوردی",
          value: "تنگه نوردی",
        },
        {
          text: "دوچرخه سواری",
          value: "دوچرخه سواری",
        },
        {
          text: "اسکی",
          value: "اسکی",
        },
        {
          text: "گشت شهری",
          value: "گشت شهری",
        },
      ],
      onFilter: (value, record) => record.eventType.indexOf(value) === 0,
    },
    {
      title: "تاریخ اجرا",
      dataIndex: "eventStartDate",
      key: "eventStartDate",
    },
    {
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "ظرفیت برنامه",
      dataIndex: "eventCapacity",
      key: "eventCapacity",
    },
    {
      title: "هزینه برنامه",
      key: "eventPrice",
      dataIndex: "eventPrice",
    },
    {
      title: "وضعیت برنامه",
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: "waiting",
          value: "waiting",
        },
        {
          text: "suspend",
          value: "suspend",
        },
        {
          text: "remove",
          value: "remove",
        },
        {
          text: "confirm",
          value: "confirm",
        },
        {
          text: "cancell",
          value: "cancell",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,

      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = tag === "waiting" ? "geekblue" : "green";
            if (tag === "waiting") {
              color = "volcano";
            } else if (tag === "suspend") {
              color = "#808080";
            } else if (tag === "confirm") {
              color = "green";
            } else if (tag === "remove") {
              color = "red";
            } else if (tag === "cancell") {
              color = "brown";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <InputDropDown setEventsList={setEventsList} record={record} />
        </Space>
      ),
    },
  ];

  const events = eventsList.map((event) => ({
    key: event._id,
    eventType: event.event_type,
    status: [event.event_status],
    eventTitle: event.event_title,
    eventPrice: event.event_price,
    mobile: event.event_owner.mobile,
    mobile: event.event_owner.mobile,
    eventStartDate: event.startEventDate,
    club_name: event.event_owner.club_name,
    eventCapacity:
      event.event_capacity +
      " / " +
      (+event.event_capacity - event.event_participants?.length),
  }));
  return <Table columns={columns} dataSource={events} />;
};
export default EventsFormTable;
