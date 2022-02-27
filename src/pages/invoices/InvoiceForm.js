import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Form, Row, Col, Input, Divider, Collapse } from 'antd';

import 'antd/dist/antd.css';
import axios from 'axios';

import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import HeaderTab from '../../components/nav/HeaderTab';
import invoiceFields from '../../constant/invoiceFields';

const InvoiceForm = () => {
    const [invoice, setInvoice] = useState("")
    const [form] = Form.useForm();
    const { Panel } = Collapse;

    const { id } = useParams();

    async function getInvoice() {
        axios.get("http://localhost:8000/api/invoices/" + id, { crossdomain: true })
            .then(res => {
                let data = res.data
                setInvoice(data)
            })
    }

    const getFields = () => {
        const count = 10
        const children = [];
        let invoiceKeys = Object.keys(invoice)
        invoiceKeys.map((fieldName, index) => {
            if (invoiceFields[0][fieldName]) {
                children.push(
                    <Col span={8} key={index}>
                        <Form.Item
                            name={`${fieldName}`}
                            label={`${invoiceFields[0][fieldName]}`}
                        >
                            <Input disabled={true} defaultValue={`${invoice[fieldName]}`} />
                        </Form.Item>
                    </Col>,
                );
            }

        });
        return children;
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    function callback(key) {
        console.log(key);
      }

    useEffect(() => {
        getInvoice()
    }, [])

    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                <div className="col-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col">
                    <Header></Header>
                    <div>
                        <h2 style={{ marginTop: 10 }}>Invoice</h2>
                        <Divider></Divider>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            onFinish={onFinish}
                            style={{paddingRight:20, paddingLeft:20}}
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
                            <Divider></Divider>
                            <Collapse defaultActiveKey={['1']} onChange={callback}>
                                <Panel header="Cart Item" key="1">
                                    <p>xxx</p>
                                </Panel>
                            </Collapse>
                        </Form>
                    </div>
                    <div style={{ padding: 10 }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceForm;