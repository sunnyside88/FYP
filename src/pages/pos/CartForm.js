import { Table, Input, Row, Col, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import axios from 'axios';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import ProductSchema from '../../schema/product/ProductColumnSchema';

const CartForm = () => {
    const { Option } = Select;
    const handleSelect = (key) =>{
        console.log(key, "xxxvalue")
    }
    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                <div className="col-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col">
                    <Header></Header>
                    <div className="col-4">
                        <h3 style={{ marginTop: 10 }} >POS</h3>
                    </div>
                    <Row type='flex'>
                        <Col flex={3} style={{ color: 'CCD1E4' }}>
                            <Select
                                showSearch
                                style={{ width: 300, paddingLeft:10 }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onSelect={handleSelect}
                            >
                                <Option key='1' value="1">[xxxx]Bolt</Option>
                                <Option key='2' value="2">[1234]Kopi</Option>
                            </Select>
                            <div style={{ padding: 10 }}>
                                <Table

                                >
                                </Table>
                            </div>
                        </Col>
                        <Col flex={1}>
                            <div style={{ justifyContent: 'center', alignItems: 'center', borderLeft: 'solid' }}>

                            </div>
                        </Col>
                    </Row>
                    <div style={{ padding: 10 }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartForm;