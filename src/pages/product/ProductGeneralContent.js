import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import axios from 'axios';
import { Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ProductGeneralContent = () => {
  const [expand, setExpand] = useState(false);
  const [product, setProduct] = useState("")
  const [form] = Form.useForm();
  const { id } = useParams();

  async function getProduct() {
    axios.get("http://localhost:8000/api/products/" + id, { crossdomain: true })
      .then(res => {
        let data = res.data
        setProduct(data)
      })
  }

  useEffect(() => {
    getProduct()
  }, [])

  const getFields = () => {
    const count = 10
    const children = [];
    console.log("xxxpro", product)
    let productKeys = Object.keys(product)
    productKeys.map((fieldName, index) => {
      children.push(
        <Col span={8} key={index}>
          <Form.Item
            name={`${fieldName}`}
            label={`${fieldName}`}
          >
              <Input disabled={true} defaultValue= {`${product[fieldName]}`} />
          </Form.Item>
        </Col>,
      );
    });
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



