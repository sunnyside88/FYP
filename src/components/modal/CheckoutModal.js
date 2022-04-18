import {
  Modal,
  Layout,
  Row,
  Col,
  Button,
  Divider,
  InputNumber,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutModal = ({ isModalVisible, setVisible, formData }) => {
  const { Header, Footer, Sider, Content } = Layout;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { contacts } = useSelector((state) => state.contacts);
  const { payMethods } = useSelector((state) => state.payMethods);
  const [paidAmt, setPaidAmt] = useState(0);
  const [returnAmt, setReturnAmt] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [payMethodName, setPayMethodName] = useState("");
  const style = { background: "#0092ff", padding: "8px 0" };
  const { Text, Link } = Typography;

  useEffect(() => {
    renderAmtSuggestion();
    if (contacts.length > 0 && formData.customerId) {
      findCustomerName();
    }
    if (payMethods.length > 0 && formData.payMethodId) {
      findPayMethodName();
    }
  }, [formData, contacts, payMethods]);

  const handleCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const handleOk = async (e) => {
    e.stopPropagation();
    setConfirmLoading(true);
    let invoice_id = await createInvoice();
    let paymeny_id = await createPayment(invoice_id)
    let gi_id = await createGi(invoice_id)
  };

  const numberFormatter = (val) => {
    return Number(val).toFixed(2);
  };

  const findCustomerName = () => {
    const con = contacts[0].contacts.find((x) => x._id == formData.customerId);
    setCustomerName(con.name);
  };

  const findPayMethodName = () => {
    console.log(formData.payMethodId, "payIdxxx");
    const method = payMethods[0].payMethods.find(
      (x) => x._id == formData.payMethodId
    );
    setPayMethodName(method.name);
  };

  const createInvoice = async () => {
    let res = await axios.post("http://fast-shore-47363.herokuapp.com/api/invoices/insertOne", {
      data: formData.data,
    });
    return res.data._id;
  };

  const createGi = async (invoice_id) =>{
    let stock_pick_lines = JSON.parse(JSON.stringify(formData.data.cart));
    stock_pick_lines.forEach(x=>{
      delete x.price
    })
    let gi_data = {
      invoice_id:invoice_id,
      from_location:"Main Warehouse",
      to_location:"Customer",
      stock_pick_lines:stock_pick_lines,
      status:"Approved",
      createdBy:formData.data.createdBy
    }
    let res = await axios.post("http://fast-shore-47363.herokuapp.com/api/gi/insertOne", {
      data: gi_data,
    });
    return res.data._id;
  }

  const createPayment = async (invoice_id) => {
    let paymentData = formData.paymentData;
    paymentData["paid_amount"] = paidAmt;
    paymentData["change_amount"] = returnAmt;
    paymentData["invoice_id"] = invoice_id;
    let res = await axios.post("http://fast-shore-47363.herokuapp.com/api/payments/insertOne", {
      data: paymentData,
    });
    setConfirmLoading(false);
    setVisible(false);
    toast.success("Transaction recorded!");
    window.location.reload();
    return res
  };

  const renderAmtSuggestion = () => {
    let absAmt = Math.abs(formData.totalAmtCart);
    let bills = [1, 5, 10, 20, 50, 100];
    let amounts = calAmtSuggestion(absAmt, bills);
    if (amounts[0] == formData.totalAmtCart) amounts = amounts.slice(1);
    var pmt_amt1 = amounts[0];
    var pmt_amt2 = amounts[1];
    var pmt_amt3 = amounts[2];
    var pmt_amt4 = amounts[3];
    return (
      <Row gutter={16} justify="center">
        <Col className="gutter-row" span={6}>
          <div>
            <Button
              onClick={() => {
                setPaidAmt(pmt_amt1);
                setReturnAmt(pmt_amt1 - formData.totalAmtCart);
              }}
              shape="round"
              disabled={pmt_amt1 ? false : true}
              style={{ width: "100%" }}
            >
              {numberFormatter(pmt_amt1)}
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Button
              onClick={() => {
                setPaidAmt(pmt_amt2);
                setReturnAmt(pmt_amt2 - formData.totalAmtCart);
              }}
              shape="round"
              disabled={pmt_amt2 ? false : true}
              style={{ width: "100%" }}
            >
              {numberFormatter(pmt_amt2)}
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Button
              onClick={() => {
                setPaidAmt(pmt_amt3);
                setReturnAmt(pmt_amt3 - formData.totalAmtCart);
              }}
              shape="round"
              disabled={pmt_amt3 ? false : true}
              style={{ width: "100%" }}
            >
              {numberFormatter(pmt_amt3)}
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Button
              onClick={() => {
                setPaidAmt(pmt_amt4);
                setReturnAmt(pmt_amt4 - formData.totalAmtCart);
              }}
              shape="round"
              disabled={pmt_amt4 ? false : true}
              style={{ width: "100%" }}
            >
              {numberFormatter(pmt_amt4)}
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  const calAmtSuggestion = (amt, bills) => {
    if (bills.length < 1) return [];
    let billAmt = bills[0];
    let n = Math.ceil(amt / billAmt);
    let amounts = [n * billAmt];
    amounts = amounts.concat(calAmtSuggestion(amt, bills.slice(1)));
    amounts = [...new Set(amounts)];
    amounts = amounts.sort((a, b) => {
      return a - b;
    });
    return amounts;
  };

  return (
    <>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={500}
        confirmLoading={confirmLoading}
        okText="Complete Payment"
      >
        <Layout>
          <Header
            style={{
              backgroundColor: "#D1D1D1",
              textAlign: "center",
              height: 100,
              borderRadius: 5,
              paddingTop: 10,
            }}
          >
            <h6>Total</h6>
            <h1>{numberFormatter(formData.totalAmtCart)}</h1>
          </Header>
          <Header
            style={{
              backgroundColor: "#C3DBD9",
              textAlign: "center",
              height: 40,
              borderRadius: 10,
              marginTop: 10,
              paddingTop: 10,
            }}
          >
            <h6>{customerName}</h6>
          </Header>
          <Header
            style={{
              backgroundColor: "#C3DBD9",
              textAlign: "center",
              height: 40,
              borderRadius: 10,
              marginTop: 10,
              paddingTop: 10,
            }}
          >
            <h6>Paid by: {payMethodName}</h6>
          </Header>
          <Divider></Divider>
          <Content style={{ padding: 10 }}>
            {renderAmtSuggestion()}
            <Row gutter={16} justify="center">
              <InputNumber
                style={{ width: 100, marginTop: 10 }}
                placeholder="PAID"
                value={paidAmt}
                formatter={(value) => parseFloat(value).toFixed(2)}
              />
              <Button
                onClick={() => {
                  setPaidAmt(formData.totalAmtCart);
                }}
                style={{ marginTop: 10 }}
                type="primary"
              >
                Exact
              </Button>
            </Row>
            <Divider></Divider>
            <Header
              style={{
                backgroundColor: "#EFEFEF",
                textAlign: "center",
                height: 100,
                borderRadius: 5,
              }}
            >
              <h6>RETURN</h6>
              <h1>{numberFormatter(returnAmt)}</h1>
            </Header>
          </Content>
        </Layout>
      </Modal>
    </>
  );
};

export default CheckoutModal;
