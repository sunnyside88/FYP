import { Table, Input, Space, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import NewPayMethodModal from "../../components/modal/NewPayMethodModal";
import PayMethodColumnSchema from "../../schema/payMethods/payMethodColumnSchema";

const Dashboard = () => {
  const { payMethods } = useSelector((state) => state.payMethods);

  const [formattedMethods, setFormattedMethods] = useState([]);
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
            setModalTitle("Edit Mode");
            setEditPayMethodId(record._id);
            setVisibleNewItemModal(true);
          }}
        >
          <EditOutlined />
        </a>
        <a
          onClick={() => {
            const deleteConfig = {
              title: "Delete Record?",
              content: (
                <>
                  <p>Are you sure you want to delete this?</p>
                </>
              ),
              onOk: async () => {
                await deleteMethod(record._id);
                window.location.reload();
              },
            };
            modal.confirm(deleteConfig);
          }}
        >
          <DeleteOutlined />
        </a>
      </Space>
    );
    setMethodColumnSchema(methodColumnSchema);
  }

  const onChangeSearch = (e) => {
    e.preventDefault();
    let input = e.target.value.toLowerCase();
    let lines = JSON.parse(JSON.stringify(payMethods[0].payMethods));
    const searchResult = lines.filter((data) => {
      return Object.keys(data).some((key) => {
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input);
      });
    });
    setFormattedMethods(searchResult);
  };
  useEffect(() => {
    renderSchema();
    if (payMethods.length > 0) {
      setFormattedMethods(payMethods[0].payMethods);
    }
  }, [payMethods]);

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
            <h3 style={{ marginTop: 10 }}>Dashboard</h3>
          </div>
          <div style={{ padding: 10 }}>
           
            {contextHolder}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
