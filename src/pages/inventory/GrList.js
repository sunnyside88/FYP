import { Table, Input, Space, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";
import LocationColumnSchema from "../../schema/locations/LocationColumnSchema";
import GrColumnSchema from "../../schema/inventory/GrColumnSchema";

const GrList = () => {
  const { grs } = useSelector((state) => state.grs);

  const [formattedGrs, setFormattedGrs] = useState([]);
  const [grColumnSchema, setGrColumnSchema] =
    useState(GrColumnSchema);

  async function renderSchema() {
    grColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
          
          }}
        >
          <EyeOutlined />
        </a>
      </Space>
    );
    setGrColumnSchema(grColumnSchema);
  }

  useEffect(() => {
    renderSchema();
    if (grs.length > 0) {
        setFormattedGrs(grs[0].grs);
    }
  }, [grs]);

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
            <h3 style={{ marginTop: 10 }}>Goods Receive</h3>
          </div>

          <div style={{ padding: 10 }}>
            <Table
              dataSource={formattedGrs}
              columns={grColumnSchema}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            ></Table>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrList;
