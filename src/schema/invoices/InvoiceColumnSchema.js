import moment from "moment";
import { Tag } from "antd";

export default [
  {
    title: "Number",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Contact",
    dataIndex: "customer_id",
    key: "customer_id",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => moment(value).utc().format("YYYY-MM-DD"),
  },
  {
    title: "Paid Amount",
    dataIndex: "cart_total",
    key: "cart_total",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => {
      if (value == "PAID") {
        return <Tag color="success">{value}</Tag>;
      }
    },
  },
  {
    title: "Action",
    key: "action",
  },
];
