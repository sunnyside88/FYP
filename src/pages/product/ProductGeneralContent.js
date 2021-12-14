import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ProductGeneralContent = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const product = useSelector(state => state.product)

  const getFields = () => {
    const count = 10
    const children = [];
    console.log("xxxpro", product)
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>,
      );
    }

    return children;
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
        </Col>
      </Row>
    </Form>
  )
}

export default ProductGeneralContent;



