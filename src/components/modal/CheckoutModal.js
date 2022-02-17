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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutModal = ({ isModalVisible, setVisible, formData }) => {
  const { Header, Footer, Sider, Content } = Layout;
  const [confirmLoading, setConfirmLoading]= useState(false)
  const { contacts } = useSelector((state) => state.contacts);
  const [paidAmt, setPaidAmt] = useState(0);
  const [returnAmt, setReturnAmt] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const style = { background: "#0092ff", padding: "8px 0" };
  const { Text, Link } = Typography;

  useEffect(() => {
    renderAmtSuggestion();
    if (contacts.length > 0 && formData.customerId) {
      findCustomerName();
    }
  }, [formData, contacts]);

  const handleCancel = (e) => {
    e.stopPropagation();
    setConfirmLoading(true);
    setVisible(false);
  };

  const handleOk = (e) => {
    e.stopPropagation();
    
    setVisible(false);
  };

  const numberFormatter = (val) => {
    return Number(val).toFixed(2);
  };

  const findCustomerName = () => {
    console.log(formData.customerId)
    const con = contacts[0].contacts.find((x) => x._id == formData.customerId);
    setCustomerName(con.name);
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
