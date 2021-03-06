import {
  Table,
  Space,
  Row,
  Col,
  Card,
  Select,
  Button,
  InputNumber,
  Statistic,
  Typography,
  Divider,
  Modal,
} from "antd";
import { toast } from "react-toastify";
import { MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import CheckoutModal from "../../components/modal/CheckoutModal";

import PosCartColumnSchema from "../../schema/pos/PosCartColumnSchema";

const CartForm = () => {
  const { products } = useSelector((state) => state.products);
  let { user } = useSelector((state) => ({ ...state }));
  const [posCartColumnSchema, setPosCartColumnSchema] =
    useState(PosCartColumnSchema);
  const [productOptions, setProductOptions] = useState([]);

  const { contacts } = useSelector((state) => state.contacts);
  const [contactOptions, setContactOptions] = useState([]);

  const { payMethods } = useSelector((state) => state.payMethods);
  const [payMethodOptions, setPayMethodOptions] = useState([]);

  const [enteredItemId, setEnteredItemId] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [totalAmtCart, setTotalAmtCart] = useState(0);

  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [modal, contextHolder] = Modal.useModal();
  const [visibleCheckout, setVisibleCheckout] = useState(false);
  const [checkoutFormData, setCheckoutFormData] = useState({});
  const { Text } = Typography;

  useEffect(() => {
    if (products.length > 0) {
      let arr = [];
      products[0].products.map((prod) => {
        arr.push({
          value: prod._id,
          label: `[${prod.code}] ${prod.name}`,
        });
      });
      setProductOptions(arr);
    }
    if (contacts.length > 0) {
      let arr = [];
      contacts[0].contacts.map((con) => {
        arr.push({
          value: con._id,
          label: `[${con.code}] ${con.name}`,
        });
      });
      setContactOptions(arr);
    }

    if (payMethods.length > 0) {
      let arr = [];
      payMethods[0].payMethods.map((con) => {
        arr.push({
          value: con._id,
          label: `${con.name}`,
        });
      });
      setPayMethodOptions(arr);
    }
    renderSchema();
  }, [products, contacts, cartItem, payMethods]);

  const showCheckout = () => {
    if (cartItem.length < 1) {
      toast.error("Please add cart before proceed!");
      return;
    } else if (!customer) {
      toast.error("Please choose customer!");
      return;
    } else if (!paymentMethod) {
      toast.error("Pleas choose payment method!");
      return;
    } else {
      let temp = [];
      cartItem.map((x) => {
        let line = {
          product_id: x._id,
          product_name: x.name,
          product_code: x.code,
          qty: x.qty,
          price: x.price,
          uom: x.uom,
          line_total: x.qty * x.price,
        };
        temp.push(line);
      });
      setCheckoutFormData({
        totalAmtCart: totalAmtCart,
        customerId: customer,
        payMethodId: paymentMethod,
        data: {
          customer_id: customer,
          stock_pick_id: 0, //tbc
          cart: temp,
          cart_total: totalAmtCart,
          status: "PAID",
          createdBy: user.email.substring(0, user.email.indexOf("@")),
        },
        paymentData: {
          pay_method_id: paymentMethod,
          total: totalAmtCart,
          status: "Posted",
        },
      });
      setVisibleCheckout(true);
    }
  };

  const onChangeQty = (value, record) => {
    if(value>record.stock_qty){
      toast.error(`Insufficient stock quantity - ${record.stock_qty}`)
      return
    }
    let totalAmt = value * record.price;
    let lines = JSON.parse(JSON.stringify(cartItem));
    lines.filter((x) => {
      if (x._id == record._id) {
        x["amount"] = totalAmt;
        x["qty"] = value;
      }
    });
    console.log(lines);
    onChangeTotalAmtCart(lines);
    setCartItem(lines);
  };

  const onChangeTotalAmtCart = (lines) => {
    let total = 0;
    lines.map((x) => {
      total += x.amount;
    });
    setTotalAmtCart(total);
  };

  async function deleteCartItem(id) {
    let lines = JSON.parse(JSON.stringify(cartItem));
    let filteredLine = lines.filter(function (el) {
      return el._id != id;
    });
    setCartItem(filteredLine);
    onChangeTotalAmtCart(filteredLine);
  }

  async function renderSchema() {
    posCartColumnSchema.at(4).render = (text, record) => (
      <InputNumber
        min={1}
        value={record.qty}
        formatter={(value) => Math.round(value)}
        onChange={(value) => onChangeQty(value, record)}
      />
    );
    posCartColumnSchema.at(2).render = (text, record) => (
      <span>{record.price.toFixed(2)}</span>
    );
    posCartColumnSchema.at(5).render = (text, record) => (
      <span>{record.amount.toFixed(2)}</span>
    );
    posCartColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            const deleteConfig = {
              title: "Delete Item?",
              content: (
                <>
                  <p>Are you sure you want to delete this?</p>
                </>
              ),
              onOk: async () => {
                await deleteCartItem(record._id);
              },
            };
            modal.confirm(deleteConfig);
          }}
        >
          <MinusCircleOutlined style={{ color: "red" }} />
        </a>
      </Space>
    );
    setPosCartColumnSchema(posCartColumnSchema);
  }

  const handleProductSelect = (value) => {
    setEnteredItemId(value);
  };

  const handleContactSelect = (value) => {
    setCustomer(value);
  };

  const handlePayMethodSelect = (value) => {
    setPaymentMethod(value);
  };

  const enterProduct = () => {
    let lines = JSON.parse(JSON.stringify(cartItem));
    if (!enteredItemId) {
      toast.error("Missing product!");
      return;
    }
    const pro = products[0].products.find((x) => x._id == enteredItemId);
    if(pro.stock_qty<1){
      toast.error(`Insufficient stock quantity - ${pro.stock_qty}`)
      return
    }
    if (lines.some((e) => e._id == enteredItemId)) {
      let foundIndex = lines.findIndex((x) => x._id == enteredItemId);
      lines[foundIndex].qty = lines[foundIndex].qty + 1;

      lines[foundIndex].amount =
        lines[foundIndex].qty * lines[foundIndex].price;
      setCartItem(lines);
    } else {
      const newProduct = products[0].products.find(
        (x) => x._id == enteredItemId
      );
      newProduct.qty = 1;
      newProduct.amount = newProduct.qty * newProduct.price;
      newProduct.key = newProduct._id;
      lines.push(newProduct);
    }
    onChangeTotalAmtCart(lines);
    setCartItem(lines);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col">
          <Header></Header>
          <Row type="flex" style={{ height: "100vh" }}>
            <Col flex={2} style={{ color: "CCD1E4" }}>
              <h3 style={{ marginTop: 10, paddingLeft: 10 }}>POS</h3>
              <Select
                showSearch
                style={{ width: 300, paddingLeft: 10 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  return (
                    option.value?.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.label?.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                  );
                }}
                onSelect={handleProductSelect}
                options={productOptions}
              ></Select>
              <Button type="primary" onClick={enterProduct} ghost>
                Enter
              </Button>
              <div style={{ padding: 10 }}>
                <Table
                  size="small"
                  rowSelection={rowSelection}
                  columns={PosCartColumnSchema}
                  dataSource={cartItem}
                  rowKey="_id"
                ></Table>
                {contextHolder}
              </div>
            </Col>
            <Card style={{ borderRadius: "20px" }}>
              <Col flex={1}>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Subtotal</Text>
                  <Statistic value={totalAmtCart} precision={2} />
                  <Divider />
                  <Text>Customer</Text>
                  <br></br>
                  <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Search to Select"
                    filterOption={(input, option) => {
                      return (
                        option.value
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0 ||
                        option.label
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    onSelect={handleContactSelect}
                    options={contactOptions}
                  ></Select>
                  <Divider />
                  <Text>Payment Method</Text>
                  <br></br>
                  <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Search to Select"
                    filterOption={(input, option) => {
                      return (
                        option.value
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0 ||
                        option.label
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    onSelect={handlePayMethodSelect}
                    options={payMethodOptions}
                  ></Select>
                  <Divider />
                  <Button
                    onClick={showCheckout}
                    type="primary"
                    style={{ width: 150 }}
                  >
                    Checkout
                    <CheckoutModal
                      isModalVisible={visibleCheckout}
                      setVisible={setVisibleCheckout}
                      formData={checkoutFormData}
                    ></CheckoutModal>
                  </Button>
                </div>
              </Col>
            </Card>
          </Row>
          <div style={{ padding: 10 }}></div>
        </div>
      </div>
    </div>
  );
};

export default CartForm;
