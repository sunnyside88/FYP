import { Modal, Form, Col, Input, Row, InputNumber, Select} from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import productFields from "../../constant/productFields";
import { useSelector } from "react-redux";

const NewProductModal = ({
  isModalVisible,
  title,
  editProductId,
  setVisibleProductModal,
  setEditProductId,
}) => {
  const { products } = useSelector((state) => state.products);
  const { uoms } = useSelector((state) => state.uoms);

  const [form] = Form.useForm();
  const [pro, setPro] = useState({});
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [uom, setUom] = useState("");
  const [refreshKey, setKey] = useState("");
  const [uomOptions, setUomOptions] = useState([]);

  useEffect(() => {
    if (editProductId && products.length > 0) {
      let pro = products[0].products.find((x) => x._id == editProductId);
      setPro(pro);
      setName(pro.name);
      setCode(pro.code);
      setPrice(pro.price);
      setUom(pro.uom);
    }
    if (uoms.length > 0) {
      let arr = [];
      uoms[0].uoms.map((con) => {
        arr.push({
          value: con.name,
          label: `${con.name}`,
        });
      });
      setUomOptions(arr);
    }
  }, [products, uoms, editProductId]);

  const handleOk = async () => {
    if (!name) {
      toast.error("Missing name!");
      return;
    }
    if (!code) {
      toast.error("Missing code!");
      return;
    }
    setKey(Date.now());
    await upsertProduct();
    setEditProductId(null);
    setVisibleProductModal(false);
  };

  const handleCancel = () => {
    setKey(Date.now());
    setEditProductId(null);
    setVisibleProductModal(false);
  };

  const handleUomSelect = (value) => {
    setUom(value);
  };

  const upsertProduct = async () => {
    axios
      .post("http://fast-shore-47363.herokuapp.com/api/products/upsertOne", {
        data: {
          _id: editProductId ?? null,
          name: name,
          code: code,
          price: price,
          uom: uom,
        },
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        if (res.status == 200) {
          setEditProductId(null);
          toast.success("Transaction recorded!");
          window.location.reload();
        }
      });
  };

  const getFields = () => {
    const children = [];
    let payMethodKeys = Object.keys(productFields[0]);
    payMethodKeys.map((key, index) => {
      children.push(
        <Col span={8} key={index}>
          <Form.Item
            name={`${key}`}
            label={`${productFields[0][key]}`}
            rules={[
              {
                required: key == "name" || key == "code" ? true : false,
                message: `Please input your ${productFields[0][key]}`,
              },
            ]}
          >
            {(() => {
              switch (key) {
                case "name":
                  return (
                    <Input
                      allowClear={true}
                      key={refreshKey}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={editProductId?"":"Enter Name"}
                      value={name}
                    ></Input>
                  );
                  break;
                case "code":
                  return (
                    <Input
                      allowClear={true}
                      key={refreshKey}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={editProductId?"":"Enter Code"}
                      value={code}
                    ></Input>
                  );
                  break;
                case "price":
                  return (
                    <InputNumber
                      key={refreshKey}
                      onChange={(value) => setPrice(value)}
                      placeholder={editProductId?"":"Enter Price"}
                      value={price}
                      min={0}
                    ></InputNumber>
                  );
                  break;
                case "uom":
                  return (
                    <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Select Uom"
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
                    onSelect={handleUomSelect}
                    options={uomOptions}
                  ></Select>
                  );
                  break;
                default:
                  return "";
              }
            })()}
            <br></br>
          </Form.Item>
        </Col>
      );
    });
    return children;
  };

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        width={900}
      >
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>{getFields()}</Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "right",
              }}
            ></Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default NewProductModal;
