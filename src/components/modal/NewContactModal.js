import { Modal, Form, Col, Input, Row, InputNumber } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import payMethodFields from "../../constant/payMethodFields";
import contactFields from "../../constant/contactFields";
import { useSelector } from "react-redux";

const NewContactModal = ({
  isModalVisible,
  title,
  editContactId,
  setVisibleNewItemModal,
  setEditContactId,
}) => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [con, setCon] = useState([]);
  const { contacts } = useSelector((state) => state.contacts);
  const [refreshKey, setKey] = useState("");

  useEffect(() => {
    if (editContactId && contacts.length > 0) {
      const con = contacts[0].contacts.find((x) => x._id == editContactId);
      setName(con.name);
      setCode(con.code);
      setPhone(con.phone);
      setEmail(con.email)
      setCon(con);
    }
  }, [contacts, editContactId]);

  const handleOnchange = (event) => {
    setName(event.target.value);
  };
  const handleOk = async () => {
    if (!editContactId) {
      if (!name) {
        toast.error("Missing name!");
        return;
      }
      if (!code) {
        toast.error("Missing code!");
        return;
      }
    }
    setKey(Date.now());
    await upsertPayMethod();
    setEditContactId(null);
    setVisibleNewItemModal(false);
  };

  const handleCancel = () => {
    setKey(Date.now());
    setVisibleNewItemModal(false);
    setEditContactId(null);
  };

  const upsertPayMethod = async () => {
    axios
      .post("http://localhost:8000/api/contacts/upsertOne", {
        data: {
          _id: editContactId ?? null,
          name: name,
          code: code,
          phone: phone,
          email: email,
        },
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        if (res.status == 200) {
          setEditContactId(null);
          toast.success("Transaction recorded!");
          window.location.reload();
        }
      });
  };

  const formItemLayout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const getFields = () => {
    const children = [];
    let payMethodKeys = Object.keys(contactFields[0]);
    payMethodKeys.map((key, index) => {
      children.push(
        <Col span={8} key={index}>
          <Form.Item
            name={`${key}`}
            id={`${key}`}
            label={`${contactFields[0][key]}`}
            rules={[
              {
                required: key == "name" || key == "code" ? true : false,
                message: `Please input your ${contactFields[0][key]}`,
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
                      placeholder={editContactId && con ? con.name : ""}
                      key={refreshKey}
                      value={name}
                      defaultValue={con.name}
                    ></Input>
                  );
                  break;
                case "code":
                  return (
                    <Input
                      allowClear={true}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={editContactId && con ? con.code : ""}
                      key={refreshKey}
                      value={code}
                      initialValue={con.code}
                    ></Input>
                  );
                  break;
                case "email":
                  return (
                    <Input
                      allowClear={true}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={editContactId && con ? con.email : ""}
                      key={refreshKey}
                      value={email}
                      initialValue={con.email}
                    ></Input>
                  );
                  break;
                case "phone":
                  return (
                    <Input
                      allowClear={true}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={editContactId && con ? con.phone : ""}
                      key={refreshKey}
                      value={phone}
                      initialValue={con.phone}
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
        width={1000}
      >
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
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

export default NewContactModal;
