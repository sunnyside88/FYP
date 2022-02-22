import moment from "moment";
export default [
    {
      title: 'Number',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Contact',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:((value)=>moment(value).utc().format('YYYY-MM-DD'))
    },
    {
      title: 'Paid Amount',
      dataIndex: 'cart_total',
      key: 'cart_total',
      render:((value)=>value.toFixed(2))
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    {
      title: 'Action',
      key: 'action',
    },
  ];

