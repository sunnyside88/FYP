export default [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (value) => {
      if (!value) {
        return "NA";
      } else {
        return value;
      }
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (value) => {
      if (!value) {
        return "NA";
      } else {
        return value;
      }
    },
  },
  {
    title: "Action",
    key: "action",
  },
];
