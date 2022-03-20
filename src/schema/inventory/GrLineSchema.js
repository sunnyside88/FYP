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
    title: "Uom",
    dataIndex: "uom",
    key: "uom",
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
