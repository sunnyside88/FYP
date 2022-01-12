import { Table, Input, Space, Button } from 'antd'
import 'antd/dist/antd.css';

import axios from 'axios';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import ProductSchema from '../../schema/product/ProductColumnSchema';

const UomList = () => {
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
                        <h3 style={{ marginTop: 10 }} >Unit of Measure</h3>
                        <Button type="primary" shape="round">Import</Button>
                    </div>

                    <div style={{ padding: 10 }}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UomList;