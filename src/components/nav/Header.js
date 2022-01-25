import axios from 'axios';

import { auth } from '../../firebase.js';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { BsFillClockFill, BsFillCalendar2MinusFill, BsFillDoorOpenFill } from "react-icons/bs";
import Navbar from 'react-bootstrap/Navbar'
import moment from "moment";

const Header = () => {
    const [formmattedDate, setFormattedDate] = useState("")
    const [formattedTime, setFormattedTime] = useState(moment().format('LT'))
    const [userName, setUserName] = useState("")

    let dispatch = useDispatch()
    let history = useHistory()
    let { user } = useSelector((state) => ({ ...state }));
    
    useEffect(() => {
        console.log(user,"user")
        getProducts()
        if(!user){
            //history.push('/login')
            return
        }
        let isMounted = true
        if (isMounted) {
            setInterval(() => {
                let time = moment().format('LT');
                setFormattedTime(time)
            }, 60000)
            let date = moment().format('MMMM Do YYYY')
            setFormattedDate(date)
            setUserName(user.email.substring(0, user.email.indexOf("@")))
        }
        return () => { isMounted = false }
    },[])

    const logout = () => {
        auth.signOut()
        dispatch({
            type: "LOGOUT",
            payload: null,
        })
        history.push("/login")
    }

    //throw into store-experimenting
    async function getProducts() {
        axios.get("http://localhost:8000/api/products", { crossdomain: true })
            .then(res => {
                let data = res.data
                data.forEach(function (element, index) {
                    Object.assign(element, { key: index })
                });
                dispatch({
                    type:"REFRESH_PRODUCT_LIST",
                    payload:{
                      products:data,
                    },
                  });
            })
    }

    return (
        <Navbar sticky="top" className="shadow-none bg-light" style={{ height: "45px" }}>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li>
                        <Navbar.Text style={{ margin: "10px" }}>
                            Hi, {userName}
                        </Navbar.Text>
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
                    <a className="nav-link" href="#" onClick={logout}> <BsFillDoorOpenFill /> Log out</a>
                </span>
            </div>
        </Navbar>
    );
}

export default Header;