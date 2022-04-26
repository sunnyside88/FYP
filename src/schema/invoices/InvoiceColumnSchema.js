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
    defaultSortOrder: 'descend',
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    render: (value) => moment(value).utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Paid Amount",
    dataIndex: "cart_total",
    key: "cart_total",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.cart_total - b.cart_total,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => {
      if (value == "PAID") {
        return <Tag color="success">{value}</Tag>;
      }
      else if (value == 'VOIDED'){
        return <Tag color="warning">{value}</Tag>
      }
    },
  },
  {
    title: "Action",
    key: "action",
  },
];
