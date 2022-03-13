import { Modal, Form, Col, Input, Row, InputNumber } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import productFields from "../../constant/productFields";

const NewProductModal = ({
  isModalVisible,
  title,
  editProductId,
  setVisibleProductModal,
  setEditProductId,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [uom, setUom] = useState("");

  useEffect(() => {
    setFormData({
      _id: editProductId ?? null,
      name: name,
      code: code,
      price: price,
      uom: uom,
    });
  }, [name, code, price, uom]);

  const handleOk = async () => {
    if (!name) {
      toast.error("Missing name!");
      return;
    }
    if (!code) {
      toast.error("Missing code!");
      return;
    }
    await upsertProduct();
    setVisibleProductModal(false);
  };

  const handleCancel = () => {
    setVisibleProductModal(false);
  };

  const upsertProduct = async () => {
    axios
      .post("http://localhost:8000/api/products/upsertOne", {
        data: formData,
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
                      onChange={(e) => setName(e.target.value)}
                    ></Input>
                  );
                  break;
                case "code":
                  return (
                    <Input
                      allowClear={true}
                      onChange={(e) => setCode(e.target.value)}
                    ></Input>
                  );
                  break;
                case "price":
                  return (
                    <InputNumber
                      onChange={(value) => setPrice(value)}
                      min={0}
                    ></InputNumber>
                  );
                  break;
                case "uom":
                  return (
                    <Input
                      allowClear={true}
                      onChange={(e) => setUom(e.target.value)}
                    ></Input>
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
