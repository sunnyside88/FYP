import { Modal, Form, Col, Input, Row, InputNumber } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import payMethodFields from "../../constant/payMethodFields";

const NewPayMethodModal = ({
  isModalVisible,
  title,
  editPayMethodId,
  setVisibleNewItemModal,
  setEditPayMethodId,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  useEffect(() => {
    setFormData({
      _id: editPayMethodId ?? null,
      name: name,
      service_charge: serviceCharge,
    });
  }, [name, serviceCharge]);

  const handleOk = async () => {
    if (!name) {
      toast.error("Missing name!");
      return;
    }
    if (serviceCharge<0) {
      toast.error("Missing service charge!");
      return;
    }
    await upsertPayMethod();
    setVisibleNewItemModal(false);
  };

  const handleCancel = () => {
    setVisibleNewItemModal(false);
  };

  const upsertPayMethod = async () => {
    axios
      .post("http://localhost:8000/api/payMethod/upsertOne", {
        data: formData,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        if (res.status == 200) {
          setEditPayMethodId(null);
          toast.success("Transaction recorded!");
          window.location.reload();
        }
      });
  };

  const getFields = () => {
    const children = [];
    let payMethodKeys = Object.keys(payMethodFields[0]);
    payMethodKeys.map((key, index) => {
      children.push(
        <Col span={8} key={index}>
          <Form.Item
            name={`${key}`}
            label={`${payMethodFields[0][key]}`}
            rules={[
              {
                required: true,
                message: `Please input your ${payMethodFields[0][key]}`,
              },
            ]}
          >
            {key == "name" ? (
              <Input onChange={(e) => setName(e.target.value)}></Input>
            ) : (
              <InputNumber
                onChange={(value) => setServiceCharge(value)}
                min={0}
              ></InputNumber>
            )}
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

export default NewPayMethodModal;