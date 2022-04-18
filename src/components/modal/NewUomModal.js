import { Modal, Form, Col, Input, Row, InputNumber } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import payMethodFields from "../../constant/payMethodFields";

import { useSelector } from "react-redux";
import uomFields from "../../constant/uomFields";

const NewUomModal = ({
  isModalVisible,
  title,
  editUomId,
  setVisibleNewItemModal,
  setUomId,
}) => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [uom, setUom] = useState({});
  const [refreshKey, setKey] = useState("");

  const { uoms } = useSelector((state) => state.uoms);

  useEffect(() => {
    if (editUomId && uoms.length > 0) {
      let uom = uoms[0].uoms.find((x) => x._id == editUomId);
      setUom(uom);
      setName(uom.name);
    }
  }, [uoms, editUomId]);

  const handleOk = async () => {
    if (!name) {
      toast.error("Missing name!");
      return;
    }
    setKey(Date.now());
    await upsertUom();
    setUomId(null);
    setVisibleNewItemModal(false);
  };

  const handleCancel = () => {
    setKey(Date.now());
    setUomId(null);
    setVisibleNewItemModal(false);
  };

  const upsertUom = async () => {
    axios
      .post("http://fast-shore-47363.herokuapp.com/api/uoms/upsertOne", {
        data: {
          _id: editUomId ?? null,
          name: name,
        },
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        if (res.status == 200) {
          setUomId(null);
          toast.success("Transaction recorded!");
          window.location.reload();
        }
      });
  };

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const getFields = () => {
    const children = [];
    let payMethodKeys = Object.keys(uomFields[0]);
    payMethodKeys.map((key, index) => {
      children.push(
        <Col span={8} key={index}>
          <Form.Item
            name={`${key}`}
            label={`${uomFields[0][key]}`}    
            rules={[
              {
                required: true,
                message: `Please input your ${uomFields[0][key]}`,
              },
            ]}
          >
            <Input
              allowClear={true}
              value={name}
              key={refreshKey}
              onChange={(e) => handleOnchangeName(e)}
              placeholder={editUomId?"":"Enter Uom"}
            ></Input>

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

export default NewUomModal;
