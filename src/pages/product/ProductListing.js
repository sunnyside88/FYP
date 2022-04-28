import { Table, Input, Space, Button, Modal, Spin } from "antd";
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
import NewProductModal from "../../components/modal/NewProductModal";

const Listing = () => {
  const { products } = useSelector((state) => state.products);
  const [formattedProduct, setFormattedProduct] = useState("");
  const [productColumnSchema, setProductColumnSchema] = useState(ProductSchema);
  const [showListing, setShowListing] = useState(true);
  const [visibleImport, setVisibleImport] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [editProductId, setEditProductId] = useState("");
  const [visibleNewProductModal, setVisibleProductModal] = useState(false);

  const [modal, contextHolder] = Modal.useModal();
  const ReachableContext = createContext();

  const [userToken, setUserToken] = useState("");
  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();
  const dispatch = useDispatch();

  const showImport = () => {
    setVisibleImport(true);
  };

  const handleImportCancel = () => {
    setVisibleImport(false);
  };

  const showNewProduct = () => {
    setModalTitle("New Product");
    setVisibleProductModal(true);
  };

  async function deleteProduct(id) {
    await axios
      .post(
        "http://fast-shore-47363.herokuapp.com/api/products/deleteOne",
        {
          id: id,
        },
        { headers: { userToken: `${userToken}` } }
      )
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
            setModalTitle("Edit Mode");
            setEditProductId(record._id);
            setVisibleProductModal(true);
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

  const onChangeSearch = (e) => {
    e.preventDefault();
    let input = e.target.value.toLowerCase();
    let lines = JSON.parse(JSON.stringify(products[0].products));
    const searchResult = lines.filter((data) => {
      return Object.keys(data).some((key) => {
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input);
      });
    });
    setFormattedProduct(searchResult);
  };

  useEffect(() => {
    if (products.length > 0) {
      setFormattedProduct(products[0].products);
    }
    renderSchema();
    if (user) {
      setUserToken(user.token);
    }
  }, [products, user]);

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
            <NewProductModal
              isModalVisible={visibleNewProductModal}
              title={modalTitle}
              editProductId={editProductId}
              setVisibleProductModal={setVisibleProductModal}
              setEditProductId={setEditProductId}
            ></NewProductModal>
            <h3 style={{ marginTop: 10 }}>Product Listing</h3>
            <Button
              onClick={showNewProduct}
              style={{ marginRight: 10 }}
              type="primary"
              shape="round"
            >
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
              placeholder="Global search"
              style={{ marginTop: 10 }}
              onChange={onChangeSearch}
            />
          </div>

          <div style={{ padding: 10 }}>
            {formattedProduct ? (
              <Table
                dataSource={formattedProduct}
                columns={productColumnSchema}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              ></Table>
            ) : (
              <div style={{ alignItems: "center", textAlign: "center" }}>
                <Spin tip="Loading..."></Spin>
              </div>
            )}
            {contextHolder}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
