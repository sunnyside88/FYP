import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  Divider,
  Collapse,
  Table,
  Tag,
  Space,
} from "antd";
import moment from "moment";


import "antd/dist/antd.css";
import axios from "axios";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import HeaderTab from "../../components/nav/HeaderTab";
import invoiceFields from "../../constant/invoiceFields";
import InvoiceLineSchema from "../../schema/invoices/InvoiceLineSchema";

const InvoiceForm = () => {
  const { contacts } = useSelector((state) => state.contacts);
  const [invoice, setInvoice] = useState("");
  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const { id } = useParams();

  async function getInvoice() {
    axios
      .get("http://localhost:8000/api/invoices/" + id, { crossdomain: true })
      .then((res) => {
        let data = res.data;
        setInvoice(data);
      });
  }

  const getFields = () => {
    const count = 10;
    const children = [];
    let invoiceKeys = Object.keys(invoice);
    invoiceKeys.map((key, index) => {
      if (invoiceFields[0][key]) {
        children.push(
          <Col span={8} key={index}>
            <Form.Item
              name={`${key}`}
              label={`${invoiceFields[0][key]}`}
            >
              <Input disabled={true} defaultValue={`${key=='customer_id'?contacts[0].contacts.find((x) => x._id == invoice[key]).name:invoice[key]}`} />
            </Form.Item>
          </Col>
        );
      }
    });
    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col">
          <Header></Header>
          <div>
            <Space>
              <h2 style={{ marginTop: 10, marginLeft: 10 }}>Invoice</h2>
              <Tag color="purple">Create by: {invoice.createdBy}</Tag>
              <Tag color="orange">{moment(invoice.createdAt).utc().format("MMMM Do YYYY, h:mm:ss a")}</Tag>
              <Tag color="green">{invoice.status}</Tag>
            </Space>
            <Divider style={{marginTop:10}}></Divider>
            <Form
              form={form}
              name="advanced_search"
              className="ant-advanced-search-form"
              onFinish={onFinish}
              style={{ paddingRight: 20, paddingLeft: 20 }}
            >
              <Row gutter={24}>{getFields()}</Row>
              <Row>
                <Col
                  span={24}
                  style={{
                    textAlign: "right",
                  }}
                ></Col>
              </Row>
              <Divider></Divider>
              <Collapse defaultActiveKey={["1"]} onChange={callback}>
                <Panel header="Cart Item" key="1">
                  <Table
                    dataSource={invoice.cart}
                    columns={InvoiceLineSchema}
                  ></Table>
                </Panel>
              </Collapse>
              <Divider></Divider>
              <Collapse defaultActiveKey={["2"]} onChange={callback}>
                <Panel header="Payment" key="2">
                  <Table
                    dataSource={invoice.cart}
                    columns={InvoiceLineSchema}
                  ></Table>
                </Panel>
              </Collapse>
              <Divider></Divider>
              <Collapse defaultActiveKey={["3"]} onChange={callback}>
                <Panel header="Goods Issue" key="3">
                  <Table
                    dataSource={invoice.cart}
                    columns={InvoiceLineSchema}
                  ></Table>
                </Panel>
              </Collapse>
            </Form>
          </div>
          <div style={{ padding: 10 }}></div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
