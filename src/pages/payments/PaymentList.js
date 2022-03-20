import { Table, Input, Space, Button, Modal } from "antd";
import { EditOutlined, RiseOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import NewPayMethodModal from "../../components/modal/NewPayMethodModal";
import PayMethodColumnSchema from "../../schema/payments/PaymentColumnSchema";

const PaymentList = () => {
  const { payments } = useSelector((state) => state.payments);
  const { payMethods } = useSelector((state) => state.payMethods);

  const [formattedPayments, setFormattedPayments] = useState([]);
  const [paymentForSearch, setPaymentForSearch] = useState([]);
  const [methodColumnSchema, setMethodColumnSchema] = useState(
    PayMethodColumnSchema
  );
  const [modalTitle, setModalTitle] = useState("");
  const [editPayMethodId, setEditPayMethodId] = useState("");
  const [visibleNewItemModal, setVisibleNewItemModal] = useState(false);

  const [modal, contextHolder] = Modal.useModal();
  const ReachableContext = createContext();

  let history = useHistory();
  const dispatch = useDispatch();

  const showImport = () => {
    setModalTitle("New Payment Method");
    setVisibleNewItemModal(true);
  };

  const handleImportCancel = () => {
    setVisibleNewItemModal(false);
  };

  async function deleteMethod(id) {
    axios
      .post("http://localhost:8000/api/payMethod/deleteOne", {
        id: id,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      });
  }

  async function renderSchema() {
    methodColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            
          }}
        >
          <RiseOutlined />
        </a>
      </Space>
    );
    setMethodColumnSchema(methodColumnSchema);
  }

  const onChangeSearch = (e) => {
    e.preventDefault();
    let input = e.target.value.toLowerCase();
    let lines = JSON.parse(JSON.stringify(paymentForSearch));
    const searchResult = lines.filter((data) => {
      return Object.keys(data).some((key) => {
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input);
      });
    });
    setFormattedPayments(searchResult);
  };

  useEffect(() => {
    renderSchema();
    if (payments.length > 0 && payMethods.length>0) {
        let lines = JSON.parse(JSON.stringify(payments[0].payments));
        lines.forEach( element => {
          let method = payMethods[0].payMethods.find((x) => x._id == element.pay_method_id).name
          if (method) {
            element["pay_method_id"] = method
            element["total"] = element.total.toFixed(2)
            element["paid_amount"] = element.paid_amount.toFixed(2)
            element["change_amount"] = element.change_amount.toFixed(2)
          }
        });
        setFormattedPayments(lines);
        setPaymentForSearch(lines)
    }
  }, [payments,payMethods]);

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
            <NewPayMethodModal
              isModalVisible={visibleNewItemModal}
              title={modalTitle}
              editPayMethodId={editPayMethodId}
              setVisibleNewItemModal={setVisibleNewItemModal}
              setEditPayMethodId={setEditPayMethodId}
            ></NewPayMethodModal>
            <h3 style={{ marginTop: 10 }}>Payments</h3>

            <Input
              placeholder="input search text"
              style={{ marginTop: 10 }}
              onChange={onChangeSearch}
            />
          </div>

          <div style={{ padding: 10 }}>
            <Table
              dataSource={formattedPayments}
              columns={methodColumnSchema}
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

export default PaymentList;
