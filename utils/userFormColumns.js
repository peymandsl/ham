const columns = [
  {
    title: "نام و نام خانوادگی",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "کد ملی",
    dataIndex: "nationalID",
    key: "national_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "تاریخ تولد",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "شماره موبایل",
    dataIndex: "Mobile",
    key: "mobile",
  },
  {
    title: "شماره اضطراری",
    dataIndex: "Emergency number",
    key: "emergency_number",
  },
  {
    title: "آدرس ایمیل",
    key: "email",
    dataIndex: "email",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
