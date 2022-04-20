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
import UomColumnSchema from "../../schema/uom/UomColumnSchema";
import NewUomModal from "../../components/modal/NewUomModal";

const UomList = () => {
  const { uoms } = useSelector((state) => state.uoms);

  const [formattedUom, setFormattedUom] = useState([]);
  const [uomColumnSchema, setUomColumnSchema] = useState(UomColumnSchema);
  const [modalTitle, setModalTitle] = useState("");
  const [editUomId, setUomId] = useState("");
  const [visibleNewItemModal, setVisibleNewItemModal] = useState(false);
  const [userToken, setUserToken] = useState("");
  let { user } = useSelector((state) => ({ ...state }));
  const [modal, contextHolder] = Modal.useModal();
  const ReachableContext = createContext();

  let history = useHistory();
  const dispatch = useDispatch();

  const showImport = () => {
    setModalTitle("New Uom");
    setVisibleNewItemModal(true);
  };

  const handleImportCancel = () => {
    setVisibleNewItemModal(false);
  };

  async function deleteMethod(id) {
    axios
      .post(
        "http://fast-shore-47363.herokuapp.com/api/uoms/deleteOne",
        {
          id: id,
        },
        { headers: { userToken: `${userToken}` } }
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      });
  }

  async function renderSchema() {
    uomColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            setModalTitle("Edit Mode");
            setUomId(record._id);
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
    setUomColumnSchema(uomColumnSchema);
  }

  const onChangeSearch = (e) => {
    e.preventDefault();
    let input = e.target.value.toLowerCase();
    let lines = JSON.parse(JSON.stringify(uoms[0].uoms));
    const searchResult = lines.filter((data) => {
      return Object.keys(data).some((key) => {
        return JSON.stringify(data[key]).toLowerCase().trim().includes(input);
      });
    });
    setFormattedUom(searchResult);
  };
  useEffect(() => {
    renderSchema();
    if (uoms.length > 0) {
      setFormattedUom(uoms[0].uoms);
    }
    if (user) {
      setUserToken(user.token);
    }
  }, [uoms, user]);

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
            <NewUomModal
              isModalVisible={visibleNewItemModal}
              title={modalTitle}
              editUomId={editUomId}
              setVisibleNewItemModal={setVisibleNewItemModal}
              setUomId={setUomId}
            ></NewUomModal>
            <h3 style={{ marginTop: 10 }}>UoM</h3>
            <Button
              onClick={showImport}
              style={{ marginRight: 10 }}
              type="primary"
              shape="round"
            >
              {" "}
              New{" "}
            </Button>
            <Input
              placeholder="input search text"
              style={{ marginTop: 10 }}
              onChange={onChangeSearch}
            />
          </div>

          <div style={{ padding: 10 }}>
            <Table
              dataSource={formattedUom}
              columns={uomColumnSchema}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            ></Table>
            {contextHolder}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UomList;
