import { Table, Space, Row, Col, Select, Button, InputNumber } from "antd";
import { toast } from "react-toastify";
import { MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";

import PosCartColumnSchema from "../../schema/pos/PosCartColumnSchema";

const CartForm = () => {
  const { products } = useSelector((state) => state.products);
  const [posCartColumnSchema, setPosCartColumnSchema] = useState(PosCartColumnSchema);
  const [options, setOptions] = useState([]);
  const [enteredItemId, setEnteredItemId] = useState("");
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let arr = [];
      products[0].products.map((prod) => {
        arr.push({
          value: prod._id,
          label: `[${prod.code}] ${prod.name}`,
        });
      });
      setOptions(arr);
    }
    renderSchema();
  }, [products, cartItem]);

  const onChangeQty = (value, record) => {
    let totalAmt = value * record.price;
    let lines = JSON.parse(JSON.stringify(cartItem));
    lines.filter((x) => {
      if (x._id == record._id) {
        x["amount"] = totalAmt;
        x["qty"] = value;
      }
    });
    console.log(lines);
    setCartItem(lines);
  };

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
    console.log(posCartColumnSchema.at(4), "xxxschema");
    posCartColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a onClick={() => {}}>
          <MinusCircleOutlined style={{ color: "red" }} />
        </a>
      </Space>
    );
    setPosCartColumnSchema(posCartColumnSchema);
  }

  const handleSelect = (value) => {
    setEnteredItemId(value);
  };

  const enterProduct = () => {
    let lines = JSON.parse(JSON.stringify(cartItem));
    if (!enteredItemId) {
      toast.error("Missing product!");
      return;
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
    console.log(lines, "xxxcartitem");

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
      // Column configuration not to be checked
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
          <div style={{ display: "flex" }}>
            <div className="col-10">
              <h3 style={{ marginTop: 10 }}>POS</h3>
            </div>
            <h3 style={{ marginTop: 10 }}>{total}</h3>
          </div>

          <Row type="flex">
            <Col flex={2} style={{ color: "CCD1E4" }}>
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
                onSelect={handleSelect}
                options={options}
              ></Select>
              <Button onClick={enterProduct}>Enter</Button>
              <div style={{ padding: 10 }}>
                <Table
                  size="small"
                  rowSelection={rowSelection}
                  columns={PosCartColumnSchema}
                  dataSource={cartItem}
                  rowKey="_id"
                ></Table>
              </div>
            </Col>
            <Col flex={1}>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>ddd</p>
              </div>
            </Col>
          </Row>
          <div style={{ padding: 10 }}></div>
        </div>
      </div>
    </div>
  );
};

export default CartForm;
