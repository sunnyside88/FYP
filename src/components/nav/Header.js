import React, {useEffect,useState} from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Container,Row,Col } from "reactstrap";
import moment from "moment";
import {auth} from '../../firebase.js';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { BsFillClockFill,BsFillCalendar2MinusFill,BsFillDoorOpenFill } from "react-icons/bs";

const Header = () => {
    const [formmattedDate,setFormattedDate] = useState("")
    const [formattedTime,setFormattedTime] = useState(moment().format('LT'))
    let dispatch = useDispatch()
    let history = useHistory()
    useEffect(()=>{
        let isMounted = true
        if(isMounted){
            setInterval(()=>{
                let time = moment().format('LT');
                setFormattedTime(time)
            },60000)
             let date = moment().format('MMMM Do YYYY')
             setFormattedDate(date)
        }
        return ()=>{isMounted = false}
    },[])

    const logout = () =>{
        auth.signOut()
        dispatch({
            type:"LOGOUT",
            payload:null,
        })
        history.push("/login")
    }

    return(
        <Navbar sticky="top" className="shadow-none bg-light" style={{height:"45px"}}>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li>
                <Navbar.Text style={{margin:"10px"}}>
                        Hi, Chin
                    </Navbar.Text>
                </li>
                <li className="nav-item">
                    <BsFillCalendar2MinusFill/>
                    <Navbar.Text style={{margin:"10px"}}>
                        {formmattedDate}
                    </Navbar.Text>
                </li>
                <li className="nav-item">
                    <BsFillClockFill/>
                    <Navbar.Text  style={{margin:"10px"}}>
                        {formattedTime}
                    </Navbar.Text>
                </li>
                </ul>
                <span className="navbar-text">
                    <a className="nav-link" href="#" onClick={logout}> <BsFillDoorOpenFill/> Log out</a>
                </span>
            </div>
        </Navbar>
    );
}

export default Header;