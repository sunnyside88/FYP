import { Table, Input, Space, Button } from 'antd'
import 'antd/dist/antd.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import HeaderTab from '../../components/nav/HeaderTab';
import { fetchProduct } from '../../actions/fetchProduct';
import { connect } from 'react-redux';

import ProductFormTabSchema from '../../schema/product/ProductFormTabSchema';

const ProductForm = () => {

    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                <div className="col-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col">
                    <Header></Header>
                    <div>
                        <HeaderTab tabSchema={ProductFormTabSchema}></HeaderTab>
                    </div>
                    <div style={{ padding: 10 }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductForm;