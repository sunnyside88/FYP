import { Statistic, Row, Col, Button } from "antd";
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
import StatisticBanner from "./StatisticBanner";
import ProductPie from "./ProductPie";

const Dashboard = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col">
          <Header></Header>
          <div className="col-4">
          </div>
          <div>
            <StatisticBanner />
            <ProductPie/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
