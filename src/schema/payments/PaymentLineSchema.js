import { Tag } from "antd";

export default [
  {
    title: "Number",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Payment Method",
    dataIndex: "pay_method_name",
    key: "pay_method_name",
  },
  {
    title: "Cart Total",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Paid Amt",
    dataIndex: "paid_amount",
    key: "paid_amount",
    render: (value) => {
      return value.toFixed(2);
    },
  },
  {
    title: "Change Amt",
    dataIndex: "change_amount",
    key: "change_amount",
    render: (value) => {
      return value.toFixed(2);
    },
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => {
      if (value == "Posted") {
        return <Tag color="success">{value}</Tag>;
      }
      else if (value == 'VOIDED'){
        return <Tag color="warning">{value}</Tag>
      }
    },
  },
];
