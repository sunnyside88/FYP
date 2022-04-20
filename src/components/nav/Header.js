import axios from "axios";

import { auth } from "../../firebase.js";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
  BsFillClockFill,
  BsFillCalendar2MinusFill,
  BsFillDoorOpenFill,
} from "react-icons/bs";
import Navbar from "react-bootstrap/Navbar";
import moment from "moment";

const Header = () => {
  const [formmattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState(moment().format("LT"));
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");

  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user) {
      setInterval(() => {
        let time = moment().format("LT");
        setFormattedTime(time);
      }, 60000);
      let date = moment().format("MMMM Do YYYY");
      setFormattedDate(date);
      setUserName(user.email.substring(0, user.email.indexOf("@")));
      setUserToken(user.token);
      if (userToken) {
        getProducts();
        getGr();
        getGi();
        getPayMethods();
        getUoms();
        getContacts();
        getInvoices();
        getPayments();
        getLocations();
        getPopularItem();
      }
    }
  }, [user, userToken]);

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  //Redux Store
  async function getProducts() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/products",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_PRODUCT_LIST",
          payload: {
            products: data,
          },
        });
      });
  }

  async function getPopularItem() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/gi/filterPopularItem",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_POPULAR_ITEM",
          payload: {
            popularItems: data,
          },
        });
      });
  }

  async function getGi() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/gis",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_GI_LIST",
          payload: {
            gis: data,
          },
        });
      });
  }

  async function getGr() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/grs",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_GR_LIST",
          payload: {
            grs: data,
          },
        });
      });
  }

  async function getLocations() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/locations/",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_LOCATION_LIST",
          payload: {
            locations: data,
          },
        });
      });
  }

  async function getPayments() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/payments",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_PAYMENT_LIST",
          payload: {
            payments: data,
          },
        });
      });
  }

  async function getPayMethods() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/payMethods",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_PAY_METHOD_LIST",
          payload: {
            payMethods: data,
          },
        });
      });
  }

  async function getUoms() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/uoms",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_UOM_LIST",
          payload: {
            uoms: data,
          },
        });
      });
  }

  async function getContacts() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/contacts",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_CONTACT_LIST",
          payload: {
            contacts: data,
          },
        });
      });
  }

  async function getInvoices() {
    await axios
      .get(
        "http://fast-shore-47363.herokuapp.com/api/invoices",
        { headers: { userToken: `${userToken}` } },
        { crossdomain: true }
      )
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_INVOICE_LIST",
          payload: {
            invoices: data,
          },
        });
      });
  }

  return (
    <Navbar className="shadow-none bg-light" style={{ height: "45px" }}>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li>
            <Navbar.Text style={{ margin: "10px" }}>Hi, {userName}</Navbar.Text>
          </li>
          <li className="nav-item">
            <BsFillCalendar2MinusFill />
            <Navbar.Text style={{ margin: "10px" }}>
              {formmattedDate}
            </Navbar.Text>
          </li>
          <li className="nav-item">
            <BsFillClockFill />
            <Navbar.Text style={{ margin: "10px" }}>
              {formattedTime}
            </Navbar.Text>
          </li>
        </ul>
        <span className="navbar-text">
          <a className="nav-link" href="#" onClick={logout}>
            {" "}
            <BsFillDoorOpenFill /> Log out
          </a>
        </span>
      </div>
    </Navbar>
  );
};

export default Header;
