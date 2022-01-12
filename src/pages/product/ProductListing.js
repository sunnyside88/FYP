import { Table, Input, Space, Button } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import axios from 'axios';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import ProductSchema from '../../schema/product/ProductColumnSchema';
import ImportModal from '../../components/modal/ImportModal';

const Listing = () => {
    const [products, setProducts] = useState("")
    const [productColumnSchema, setProductColumnSchema] = useState(ProductSchema)
    const [showListing, setShowListing] = useState(true)
    const [visibleImport, setVisibleImport] = useState(false);

    let history = useHistory()

    const showImport = () => {
        setVisibleImport(true);
    };

    const handleImportCancel = () => {
        setVisibleImport(false);
    };

    const handleImportOk = () => {
        setVisibleImport(false);
    };

    async function getProducts() {
        axios.get("http://localhost:8000/api/products", { crossdomain: true })
            .then(res => {
                let data = res.data
                data.forEach(function (element, index) {
                    Object.assign(element, { key: index })
                });
                setProducts(data)
            })
    }

    async function renderSchema() {
        productColumnSchema.at(-1).render = (text, record) => (
            <Space size="middle">
                <a onClick={() => {
                    history.push(`/products/${record._id}`)
                }} ><EyeOutlined /></a>
                <a onClick={() => {
                    history.push(`/products/${record._id}`)
                }} ><EditOutlined /></a>
                <a onClick={() => {
                    history.push(`/products/${record._id}`)
                }}><DeleteOutlined /></a>
            </Space>
        )
        setProductColumnSchema(productColumnSchema)
    }

    const onSearch = value => console.log(value);

    useEffect(() => {
        getProducts()
        renderSchema()
    }, [])

    //styling
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
                        <ImportModal modal="Product" onOk={handleImportOk} onCancel={handleImportCancel} isModalVisible={visibleImport}></ImportModal>
                        <h3 style={{ marginTop: 10 }} >Product Listing</h3>
                        <Button style={{ marginRight: 10 }} type="primary" shape="round"> New Product </Button>
                        <Button onClick={showImport} style={{ marginRight: 10 }} type="primary" shape="round"> Import </Button>
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
                        <Table
                            dataSource={products}
                            columns={productColumnSchema}
                        >
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Listing;