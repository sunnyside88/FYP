import { Space } from 'antd'
import { view } from '../../utils/ProductService';
import {EyeOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router';

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
    },
  ];

