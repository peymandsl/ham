import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Space, Tag, Button, Input, Table } from "antd";

const UserFormTable = ({ filteredUsers, event, cours }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
      title: "نام و نام خانوادگی",
      dataIndex: "nameAndFamily",
      key: "nameAndFamily",
      ...getColumnSearchProps("nameAndFamily"),
      render: (_, record) => (
        <Link href={`/profile/${record.key}`}>{record.nameAndFamily}</Link>
      ),
    },
    {
      title: "نام پدر",
      dataIndex: "fatherName",
      key: "fatherName",
      ...getColumnSearchProps("fatherName"),
      // render: (_, record) => (
      //   <Link href={`/profile/${record.key}`}>{record.fatherName}</Link>
      // ),
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
  ];

  const users = event
    ? event.event_participants.map((item) => ({
        nameAndFamily:
          item.participant.first_name + " " + item.participant.last_name,
        fatherName: item.participant.fatherName,
        national_id: item.participant.national_id,
        key: item.participant._id,
        mobile: item.participant.mobile,
        dateOfBirth: item.participant.date_of_birth,
        emergency_tell: item.participant.emergency_tell,
        payment_price: item.payment_price,
      }))
    : cours
    ? cours.cours_participants.map((item) => ({
        nameAndFamily:
          item.participant.first_name + " " + item.participant.last_name,
        fatherName: item.participant.fatherName,
        national_id: item.participant.national_id,
        key: item.participant._id,
        mobile: item.participant.mobile,
        dateOfBirth: item.participant.date_of_birth,
        emergency_tell: item.participant.emergency_tell,
        payment_price: item.payment_price,
      }))
    : filteredUsers.map((user) => ({
        key: user._id,
        _id: user._id,
        mobile: user.mobile,
        nameAndFamily: user.first_name + " " + user.last_name,
        fatherName: user.fatherName,
        emergency_tell: user.emergency_tell,
        dateOfBirth: user.date_of_birth,
        national_id: +user.national_id,
        email: user.user_email,
        status: ["nice", "developer"],
      }));

  return (
    <Box style={{ marginLeft: "15px" }}>
      <Paper elevation={0}>
        <Table columns={columns} dataSource={users} />
      </Paper>
    </Box>
  );
};
export default UserFormTable;
