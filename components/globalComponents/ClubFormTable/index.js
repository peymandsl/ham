import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Link from "next/link";

import { Space, Button, Input, Table } from "antd";

const ClubFormTable = ({ filteredClubs }) => {
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
      title: "نام باشگاه",
      dataIndex: "club_name",
      key: "club_name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("club_name"),
      render: (_, record) => (
        <Link href={`/clubs/${record.key}`}>{record.club_name}</Link>
      ),
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "nameAndFamily",
      key: "nameAndFamily",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("nameAndFamily"),
    },
    {
      title: "کد ملی",
      dataIndex: "national_id",
      key: "national_id",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("national_id"),
    },
    {
      title: "تاریخ تولد",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobile",
      key: "mobile",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "شماره اضطراری",
      dataIndex: "emergency_tell",
      key: "emergency_tell",
      ...getColumnSearchProps("emergency_tell"),
    },
    {
      title: "آدرس ایمیل",
      key: "email",
      dataIndex: "email",
    },
  ];

  const clubs = filteredClubs.map((club) => ({
    key: club._id,
    nameAndFamily: club.first_name + " " + club.last_name,
    mobile: club.mobile,
    club_name: club.club_name,
    emergency_tell: club.emergency_tell,
    dateOfBirth: club.date_of_birth,
    national_id: +club.national_id,
    email: club.user_email,
    status: ["nice", "developer"],
  }));
  return <Table columns={columns} dataSource={clubs} />;
};
export default ClubFormTable;
