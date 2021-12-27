import { Table, Input, Space, Button } from 'antd'
import 'antd/dist/antd.css';

import axios from 'axios';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import ProductSchema from '../../schema/product/ProductColumnSchema';

const CartForm = () => {
    const onSearch = value => console.log(value);
    const { Search } = Input;

    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                <div className="col-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col">
                    <Header></Header>
                    <div className="col-4">
                        <h3 style={{ marginTop: 10 }} >Product Listing</h3>
                        <Button type="primary" shape="round"> New Product </Button>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="medium"
                            style={{ marginTop: 10 }}
                            onSearch={onSearch}

                        />
                    </div>

                    <div style={{ padding: 10 }}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartForm;