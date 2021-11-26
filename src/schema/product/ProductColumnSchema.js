import { Space } from 'antd'
import { view } from '../../utils/ProductService';
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
    },
    {
      title: 'Default Uom',
      dataIndex: 'uom_id',
      key: 'uom_id',
    },
    {
      title: 'Product Category',
      dataIndex: 'prod_categ',
      key: 'prod_categ',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={view} style={{color:"blue"}}>View</a>
          <a style={{color:"blue"}}>Edit</a>
          <a style={{color:"red"}}>Delete</a>
        </Space>
      ),
    },
  ];

