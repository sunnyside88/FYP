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
import GiColumnSchema from "../../schema/inventory/GiColumnSchema";

const GiList = () => {
  const { gis } = useSelector((state) => state.gis);

  const [formattedGis, setFormattedGis] = useState([]);
  const [giColumnSchema, setGiColumnSchema] =
    useState(GiColumnSchema);

  async function renderSchema() {
    giColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
          
          }}
        >
          <EyeOutlined />
        </a>
      </Space>
    );
    setGiColumnSchema(giColumnSchema);
  }

  useEffect(() => {
    renderSchema();
    if (gis.length > 0) {
        setFormattedGis(gis[0].gis);
    }
  }, [gis]);

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
            <h3 style={{ marginTop: 10 }}>Goods Issue</h3>
          </div>

          <div style={{ padding: 10 }}>
            <Table
              dataSource={formattedGis}
              columns={giColumnSchema}
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

export default GiList;
