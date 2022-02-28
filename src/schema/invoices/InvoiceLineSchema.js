import moment from "moment";
import { Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export default [
  {
    title: "Code",
    dataIndex: "product_code",
    key: "product_code",
  },
  {
    title: "Name",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Unit Price",
    dataIndex: "price",
    key: "price",
    render: (value) => value.toFixed(2),
  },
  {
    title: "Subtotal",
    dataIndex: "line_total",
    key: "line_total",
    render: (value) => value.toFixed(2),
  },
  {
    title: "Action",
    key: "action",
    render: (value) => (
      <a>
        <EyeOutlined />
      </a>
    ),
  },
];
