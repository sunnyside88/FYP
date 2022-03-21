export default [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 20,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 20,
    },
    {
      title: "Stock Qty",
      dataIndex: "stock_qty",
      key: "stock_qty",
      width: 20,
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
      width: 20,
      render: (value) => {
        if (value) {
          return value
        }
        else{
          return "NA"
        }
      },
    },
  ];
  