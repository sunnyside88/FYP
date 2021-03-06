import React, { useState, useEffect } from "react";

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
  Spin,
} from "antd";
import moment from "moment";

import "antd/dist/antd.css";
import axios from "axios";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";

import grFields from "../../constant/grFields";
import GrLineSchema from "../../schema/inventory/GrLineSchema";
import { useSelector } from "react-redux";

const GrForm = () => {
  const [gr, setGr] = useState("");
  const [userToken, setUserToken] = useState("");
  let { user } = useSelector((state) => ({ ...state }));

  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const { id } = useParams();

  const getFields = () => {
    const children = [];
    let keys = Object.keys(gr);
    keys.map((key, index) => {
      if (grFields[0][key]) {
        children.push(
          <Col span={8} key={index}>
            <Form.Item name={`${key}`} label={`${grFields[0][key]}`}>
              <Input disabled={true} defaultValue={`${gr[key]}`} />
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

  useEffect(() => {
    const getGr = async () => {
      await axios
        .get(
          "http://fast-shore-47363.herokuapp.com/api/gr/" + id,
          { headers: { userToken: `${userToken}` } },
          { crossdomain: true },
        )
        .then((res) => {
          let data = res.data;
          setGr(data);
        });
    };
    if (user) {
      setUserToken(user.token);
      if(userToken){
        getGr();
      }
    }
  }, [user,userToken]);

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
              <h2 style={{ marginTop: 10, marginLeft: 10 }}>View GR</h2>
              <Tag color="purple">Create by: {gr.createdBy}</Tag>
              <Tag color="orange">
                {moment(gr.createdAt).utc().format("MMMM Do YYYY, h:mm:ss a")}
              </Tag>
              <Tag color="green">{gr.status}</Tag>
            </Space>
            <Divider style={{ marginTop: 10 }}></Divider>
            <div style={{ alignItems: "center", textAlign: "center" }}>
              {gr ? null : <Spin tip="Loading..."></Spin>}
            </div>
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
                <Panel header="Stock Pick Items" key="1">
                  <Table
                    dataSource={gr.stock_pick_lines}
                    columns={GrLineSchema}
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

export default GrForm;
