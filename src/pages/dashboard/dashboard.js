import { Typography, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { getAuth } from "firebase/auth";
import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/nav/Sidebar";
import Header from "../../components/nav/Header";

import StatisticBanner from "./StatisticBanner";
import ProductPie from "./ProductPie";
import ProductTable from "./ProductTable";

const { Text, Link } = Typography;

const Dashboard = () => {
  let { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if(user){
      console.log(user,"xxdash");
    }
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col">
          <Header></Header>
          <div className="col-4"></div>
          <div>
            <StatisticBanner />
          </div>
          <Divider></Divider>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              textAlign: "center",
            }}
          >
            <div>
              <Text type="secondary">Top 5 Best Selling Items</Text>
              <ProductPie />
            </div>
            <div>
              <Text type="secondary">Low Stock Count Items</Text>
              <ProductTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
