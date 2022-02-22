export default [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render:((value)=>value.toFixed(2))
    },
    {
      title: 'Uom',
      dataIndex: 'uom',
      key: 'uom',
    },
    
    {
      title: 'Action',
      key: 'action',
    },
  ];

