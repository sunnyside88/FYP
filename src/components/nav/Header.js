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

  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    console.log(user, "user");
    getProducts();
    getGr();
    getGi();
    getPayMethods();
    getUoms()
    getContacts();
    getInvoices();
    getPayments();
    getLocations();
    getPopularItem();
    if (!user) {
      //history.push('/login')
      return;
    }
    let isMounted = true;
    if (isMounted) {
      setInterval(() => {
        let time = moment().format("LT");
        setFormattedTime(time);
      }, 60000);
      let date = moment().format("MMMM Do YYYY");
      setFormattedDate(date);
      setUserName(user.email.substring(0, user.email.indexOf("@")));
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

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
    axios
      .get("http://localhost:8000/api/products", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/gi/filterPopularItem", {
        crossdomain: true,
      })
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
    axios
      .get("http://localhost:8000/api/gis", { crossdomain: true })
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
      axios
        .get("http://localhost:8000/api/grs", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/locations/", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/payments", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/payMethods", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/uoms", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/contacts", { crossdomain: true })
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
    axios
      .get("http://localhost:8000/api/invoices", { crossdomain: true })
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
