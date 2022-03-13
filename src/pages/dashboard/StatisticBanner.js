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
      setGrTotalCount(grs[0].grs.length)
      setInvTotalCount(invoices[0].invoices.length);
      invoices[0].invoices.map((x) => {
        total += x.cart_total;
      });
      setInvTotal(total.toFixed(2));
    }
  }, [invoices]);

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Statistic title="Total Transactions" value={invoiceTotalCount} />
      <Statistic title="Total GR" value={grTotalCount} />
      <Statistic title="Total Sales" value={invoiceTotal} />
    </div>
  );
};

export default StatisticBanner;
