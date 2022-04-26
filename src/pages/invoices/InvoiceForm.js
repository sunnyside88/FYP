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
import PaymentColumnSchema from "../../schema/payments/PaymentColumnSchema";
import GiColumnSchema from "../../schema/inventory/GiColumnSchema";
import PaymentLineSchema from "../../schema/payments/PaymentLineSchema";

const InvoiceForm = () => {
  const { contacts } = useSelector((state) => state.contacts);
  const { payments } = useSelector((state) => state.payments);
  const { gis } = useSelector((state) => state.gis);
  const { payMethods } = useSelector((state) => state.payMethods);

  const [invoice, setInvoice] = useState("");
  const [payment, setPayment] = useState([]);
  const [gi, setGi] = useState([]);

  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const { id } = useParams();

  const [userToken, setUserToken] = useState("");
  let { user } = useSelector((state) => ({ ...state }));

  const getFields = () => {
    const children = [];
    let invoiceKeys = Object.keys(invoice);
    invoiceKeys.map((key, index) => {
      if (invoiceFields[0][key]) {
        children.push(
          <Col span={8} key={index}>
            <Form.Item name={`${key}`} label={`${invoiceFields[0][key]}`}>
              <Input
                disabled={true}
                defaultValue={`${
                  key == "customer_id"
                    ? contacts[0].contacts.find((x) => x._id == invoice[key])
                        .name
                    : invoice[key]
                }`}
              />
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

  function callbackPayment(key) {
    if (payments.length > 0) {
      let pv = payments[0].payments.find((x) => x.invoice_id == invoice._id);
      let pm = payMethods[0].payMethods.find((x) => x._id == pv.pay_method_id);
      pv["pay_method_name"] = pm.name;
      setPayment([pv]);
    }
  }

  function callbackGI(key) {
    if (gis.length > 0) {
      let gi = gis[0].gis.find((x) => x.invoice_id == invoice._id);
      setGi([gi]);
    }
  }

  useEffect(() => {
    if (user) {
      const getInvoice = async () => {
        await axios
          .get(
            "http://fast-shore-47363.herokuapp.com/api/invoices/" + id,
            { headers: { userToken: `${userToken}` } },
            { crossdomain: true }
          )
          .then((res) => {
            let data = res.data;
            setInvoice(data);
          });
      };
      setUserToken(user.token);
      if (userToken) {
        getInvoice();
      }
    }
  }, [payments, user, userToken]);

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
              <Tag color="orange">
                {moment(invoice.createdAt)
                  .utc()
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </Tag>
              {invoice.status=="PAID"?(<Tag color="green">{invoice.status}</Tag>):(<Tag color="warning">{invoice.status}</Tag>)}
              {/* <Tag color="green">{invoice.status}</Tag> */}
            </Space>
            <Divider style={{ marginTop: 10 }}></Divider>
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
              <Collapse>
                <Panel header="Cart Item" key="1">
                  <Table
                    dataSource={invoice.cart}
                    columns={InvoiceLineSchema}
                  ></Table>
                </Panel>
              </Collapse>
              <Divider></Divider>
              <Collapse onChange={callbackPayment}>
                <Panel header="Payment" key="2">
                  <Table
                    dataSource={payment}
                    columns={PaymentLineSchema}
                  ></Table>
                </Panel>
              </Collapse>
              <Divider></Divider>
              <Collapse onChange={callbackGI}>
                <Panel header="Goods Issue" key="3">
                  <Table dataSource={gi} columns={GiColumnSchema}></Table>
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
