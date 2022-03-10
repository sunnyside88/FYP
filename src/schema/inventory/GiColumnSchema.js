import { Tag } from "antd";
import moment from "moment";

export default [
  {
    title: "Number",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => moment(value).utc().format("YYYY-MM-DD"),
  },
  {
    title: "From",
    dataIndex: "from_location",
    key: "from_location",
  },
  {
    title: "To",
    dataIndex: "to_location",
    key: "to_location",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => {
      if (value == "Approved") {
        return <Tag color="success">{value}</Tag>;
      }
    },
  },

  {
    title: "Action",
    key: "action",
  },
];
