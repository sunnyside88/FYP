import { Tag } from "antd";

export default [
  {
    title: "Number",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Payment Method",
    dataIndex: "pay_method_id",
    key: "pay_method_id",
  },
  {
    title: "Cart Total",
    dataIndex: "total",
    key: "total",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: "Paid Amt",
    dataIndex: "paid_amount",
    key: "paid_amount",
  },
  {
    title: "Change Amt",
    dataIndex: "change_amount",
    key: "change_amount",
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => {
      if (value == "Posted") {
        return <Tag color="success">{value}</Tag>;
      }
    },
  },
  {
    title: "Action",
    key: "action",
  },
];
