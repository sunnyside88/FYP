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

const LocationList = () => {
  const { locations } = useSelector((state) => state.locations);

  const [formattedLocations, setFormattedLocations] = useState([]);
  const [locationColumnSchema, setLocationColumnSchema] =
    useState(LocationColumnSchema);

  async function renderSchema() {
    locationColumnSchema.at(-1).render = (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
          
          }}
        >
          <EyeOutlined />
        </a>
      </Space>
    );
    setLocationColumnSchema(locationColumnSchema);
  }

  useEffect(() => {
    renderSchema();
    if (locations.length > 0) {
      setFormattedLocations(locations[0].locations);
    }
  }, [locations]);

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
            <h3 style={{ marginTop: 10 }}>Stock Locations</h3>
          </div>

          <div style={{ padding: 10 }}>
            <Table
              dataSource={formattedLocations}
              columns={locationColumnSchema}
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

export default LocationList;
