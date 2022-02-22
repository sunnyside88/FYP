import { Table, Input, Space, Button, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import InvoiceSchema from "../../schema/invoices/InvoiceColumnSchema"

const InvoiceListing = () => {
  const { invoices } = useSelector((state) => state.invoices);
  const { contacts } = useSelector((state) => state.contacts);

  const [formattedInvoice, setFormattedInvoice] = useState([]);
  const [invoiceColumnSchema, setInvoiceColumnSchema] = useState(InvoiceSchema);
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

  const onChangeSearch = (e) => {
    e.preventDefault()
    let input = e.target.value.toLowerCase()
    let lines = JSON.parse(JSON.stringify(invoices[0].invoices));
    const searchResult = lines.filter((data) => {
      return Object.keys(data).some((key) => {
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input)
      })
    })
    setFormattedInvoice(searchResult)
  }

  async function renderSchema() {
    invoiceColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            console.log("record", record);
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
              onOk: async () => { },
            };
            modal.confirm(deleteConfig);
          }}
        >
          <DeleteOutlined />
        </a>
      </Space>
    );
    InvoiceSchema.filter(obj=>{
      if(obj.title==="Contact"){
        obj.render = ((value)=>"xx")
        return
      }
    })
    setInvoiceColumnSchema(invoiceColumnSchema);
  }

  const onSearch = (value) => console.log(value);

  useEffect(() => {
    renderSchema();
    if (invoices.length > 0) {
      setFormattedInvoice(invoices[0].invoices);
    }
  }, [invoices]);

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
            <h3 style={{ marginTop: 10 }}>Invoice Listing</h3>
            <Input
              placeholder="Global search"
              style={{ marginTop: 10 }}
              onChange={onChangeSearch}
            />
          </div>

          <div style={{ padding: 10 }}>
            <Table
              dataSource={formattedInvoice}
              columns={invoiceColumnSchema}
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

export default InvoiceListing;
