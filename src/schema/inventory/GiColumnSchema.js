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
    defaultSortOrder: 'descend',
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    render: (value) => moment(value).utc().format("YYYY-MM-DD HH:mm:ss"),
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
