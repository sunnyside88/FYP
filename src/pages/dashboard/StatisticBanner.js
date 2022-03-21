import { Statistic, Row, Col, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const StatisticBanner = () => {
  const { invoices } = useSelector((state) => state.invoices);
  const { grs } = useSelector((state) => state.grs);

  const [invoiceTotalCount, setInvTotalCount] = useState(0);
  const [grTotalCount, setGrTotalCount] = useState(0);
  const [invoiceTotal, setInvTotal] = useState(0);

  useEffect(() => {
    if (invoices.length > 0 && grs.length > 0) {
      let total = 0;
      setGrTotalCount(grs[0].grs.length);
      setInvTotalCount(invoices[0].invoices.length);
      invoices[0].invoices.map((x) => {
        total += x.cart_total;
      });
      setInvTotal(total.toFixed(2));
    }
  }, [invoices]);

  const boxStyle = {
    display: "center",
    boxSizing: "content-box",
    backgroundColor:"#EFFFFD",
    padding: 10,
    borderRadius: 10,
    width:150,
    justifyContent:'center',
    boxShadow: "1px 3px 1px #9E9E9E"
  };

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div style={boxStyle}>
        <Statistic valueStyle={{fontSize:30}} title="Total Transactions" value={invoiceTotalCount} />
      </div>
      <div style={boxStyle}>
        <Statistic title="Total GR" value={grTotalCount} />
      </div>
      <div style={boxStyle}>
        <Statistic title="Total Sales" value={invoiceTotal} />
      </div>
    </div>
  );
};

export default StatisticBanner;
