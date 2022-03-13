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
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value) => {
      if (value) {
        return value.toFixed(2);
      }
      else{
        return "NA"
      }
    },
  },
  {
    title: "Stock Qty",
    dataIndex: "stock_qty",
    key: "stock_qty",
    render: (value) => {
      if (!value) {
        return 0;
      } else {
        return value;
      }
    },
  },
  {
    title: "Uom",
    dataIndex: "uom",
    key: "uom",
    render: (value) => {
      if (value) {
        return value
      }
      else{
        return "NA"
      }
    },
  },

  {
    title: "Action",
    key: "action",
  },
];
