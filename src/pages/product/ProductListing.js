import { Table, Input, Space, Button, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import ProductSchema from "../../schema/product/ProductColumnSchema";
import ImportModal from "../../components/modal/ImportModal";

const Listing = () => {
  const { products } = useSelector((state) => state.products);
  const [formattedProduct, setFormattedProduct] = useState("");
  const [productColumnSchema, setProductColumnSchema] = useState(ProductSchema);
  const [showListing, setShowListing] = useState(true);
  const [visibleImport, setVisibleImport] = useState(false);

  const [modal, contextHolder] = Modal.useModal();
  const ReachableContext = createContext();

  let history = useHistory();
  const dispatch = useDispatch();

  const showImport = () => {
    setVisibleImport(true);
  };

  const handleImportCancel = () => {
    setVisibleImport(false);
  };

  async function deleteProduct(id) {
    axios
      .post("http://localhost:8000/api/products/deleteOne", {
        id: id,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      });
  }

  async function renderSchema() {
    productColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            console.log(record, "record");
            history.push(`/products/${record._id}`);
          }}
        >
          <EyeOutlined />
        </a>
        <a
          onClick={() => {
            history.push(`/products/${record._id}`);
          }}
        >
          <EditOutlined />
        </a>
        <a
          onClick={() => {
            const deleteConfig = {
              title: "Delete Record?",
              content: (
                <>
                  <p>Are you sure you want to delete this?</p>
                </>
              ),
              onOk: async () => {
                await deleteProduct(record._id);
                window.location.reload();
              },
            };
            modal.confirm(deleteConfig);
          }}
        >
          <DeleteOutlined />
        </a>
      </Space>
    );
    setProductColumnSchema(productColumnSchema);
  }

  const onChangeSearch = (e) =>{
    e.preventDefault()
    let input = e.target.value.toLowerCase()
    let lines = JSON.parse(JSON.stringify(products[0].products));
    const searchResult = lines.filter((data)=>{
      return Object.keys(data).some((key)=>{
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input)
      })
    })
    setFormattedProduct(searchResult)  
  }

  useEffect(() => {
    if (products.length > 0) {
      setFormattedProduct(products[0].products);
    }
    renderSchema();
  }, [products]);

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
            <ImportModal
              modal="Product"
              isModalVisible={visibleImport}
              setVisible={setVisibleImport}
            ></ImportModal>
            <h3 style={{ marginTop: 10 }}>Product Listing</h3>
            <Button style={{ marginRight: 10 }} type="primary" shape="round">
              {" "}
              New Product{" "}
            </Button>
            <Button
              onClick={showImport}
              style={{ marginRight: 10 }}
              type="primary"
              shape="round"
            >
              {" "}
              Import{" "}
            </Button>
            <Input
            placeholder="input search text"
            style={{ marginTop: 10 }}
            onChange={onChangeSearch}
            />
          </div>

          <div style={{ padding: 10 }}>
            <Table  
              dataSource={formattedProduct}
              columns={productColumnSchema}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            ></Table>
            {contextHolder}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
