import { Table, Input, Space, Button, Modal } from "antd";
import {
  EyeOutlined,
  StrikethroughOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { toast } from "react-toastify";

import axios from "axios";

import { useEffect, useState, createContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import InvoiceSchema from "../../schema/invoices/InvoiceColumnSchema";

const InvoiceListing = () => {
  const { invoices } = useSelector((state) => state.invoices);
  const { contacts } = useSelector((state) => state.contacts);
  const [userToken, setUserToken] = useState("");
  let { user } = useSelector((state) => ({ ...state }));
  const [formattedInvoice, setFormattedInvoice] = useState([]);
  const [invoiceForSearch, setInvoiceForSearch] = useState([]);
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

  async function refund(id) {
    await axios
      .post(
        "http://localhost:8000/api/invoices/update",
        {
          data: {
            _id:id,
            status:"VOIDED"
          },
        },
        { headers: { userToken: `${userToken}` } }
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        if (res.status == 200) {
          toast.success("Refunded Successfully!");
          window.location.reload();
        }
      });
  }

  const onChangeSearch = (e) => {
    e.preventDefault();
    let input = e.target.value.toLowerCase();
    let lines = JSON.parse(JSON.stringify(invoiceForSearch));
    const searchResult = lines.filter((data) => {
      return Object.keys(data).some((key) => {
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input);
      });
    });
    setFormattedInvoice(searchResult);
  };

  async function renderSchema() {
    invoiceColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            history.push(`/sales/invoices/${record._id}`);
          }}
        >
          <EyeOutlined />
        </a>
        <a
          onClick={() => {
            const deleteConfig = {
              title: "Refund?",
              content: (
                <>
                  <p>Are you sure you want to refund this?</p>
                </>
              ),
              onOk: async () => {
                await refund(record._id)
                window.location.reload();
              },
            };
            modal.confirm(deleteConfig);
          }}
        >
          <StrikethroughOutlined />
        </a>
      </Space>
    );

    setInvoiceColumnSchema(invoiceColumnSchema);
  }

  useEffect(() => {
    renderSchema();
    if (invoices.length > 0 && contacts.length > 0) {
      let lines = JSON.parse(JSON.stringify(invoices[0].invoices));
      lines.forEach((element) => {
        let con = contacts[0].contacts.find(
          (x) => x._id == element.customer_id
        ).name;
        if (con) {
          element["customer_id"] = con;
          element["cart_total"] = element.cart_total.toFixed(2);
        }
      });
      setFormattedInvoice(lines);
      setInvoiceForSearch(lines);
      if (user) {
        setUserToken(user.token);
      }
    }
  }, [invoices, contacts, user]);

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
