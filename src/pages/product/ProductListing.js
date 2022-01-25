import { Table, Input, Space, Button, Modal } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import axios from 'axios';

import { useEffect, useState, createContext } from 'react';
import { useDispatch } from "react-redux";
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

    const [modal, contextHolder] = Modal.useModal();
    const ReachableContext = createContext();

    let history = useHistory()
    const dispatch = useDispatch()

    const showImport = () => {
        setVisibleImport(true);
    };

    const handleImportCancel = () => {
        setVisibleImport(false);
    };

    //san: remove this and retrive from redux store
    async function getProducts() {
        axios.get("http://localhost:8000/api/products", { crossdomain: true })
            .then(res => {
                let data = res.data
                data.forEach(function (element, index) {
                    Object.assign(element, { key: index })
                });
                setProducts(data)
                dispatch({
                    type:"REFRESH_PRODUCT_LIST",
                    payload:{
                      products:data,
                    },
                  });
            })
    }

    async function deleteProduct(id) {
        axios.post("http://localhost:8000/api/products/deleteOne", {
            id: id
        }).then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
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
                    const deleteConfig = {
                        title: 'Delete Record?',
                        content: (
                            <>
                                <p>Are you sure you want to delete this?</p>
                            </>
                        ),
                        onOk: async () => {
                            await deleteProduct(record._id)
                            await getProducts()
                        }
                    };
                    modal.confirm(deleteConfig);
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
                        <ImportModal modal="Product" onCancel={handleImportCancel} isModalVisible={visibleImport} setVisible={setVisibleImport} getProducts={getProducts}></ImportModal>
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
                        {contextHolder}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Listing;