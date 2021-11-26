import { Table, Input, Space } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
import ProductSchema from '../../schema/product/ProductColumnSchema';

const Listing = () => {
    const [products, setProducts] = useState("")
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

    const onSearch = value => console.log(value);

    useEffect(() => {
        getProducts()
    })

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
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="medium"
                        style={{marginTop:10}}
                        onSearch={onSearch}
                    />
                    </div>
                    
                    <div style={{margin:10}}>
                        <Table dataSource={products} columns={ProductSchema}></Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Listing;