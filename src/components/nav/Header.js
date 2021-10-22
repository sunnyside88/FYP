import React, {useEffect,useState} from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Container,Row,Col } from "reactstrap";
import moment from "moment";
import { BsFillClockFill,BsFillCalendar2MinusFill,BsFillDoorOpenFill } from "react-icons/bs";

const Header = () => {
    const [formmattedDate,setFormattedDate] = useState("")
    const [formattedTime,setFormattedTime] = useState(moment().format('LT'))
    useEffect(()=>{
        setInterval(()=>{
            let time = moment().format('LT');
            setFormattedTime(time)
        },60000)
         let date = moment().format('MMMM Do YYYY')
         setFormattedDate(date)
    },[])
    return(
        <Navbar sticky="top" className="shadow-none bg-light" style={{height:"45px"}}>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                <li>
                <Navbar.Text style={{margin:"10px"}}>
                        Hi, Chin
                    </Navbar.Text>
                </li>
                <li class="nav-item">
                    <BsFillCalendar2MinusFill/>
                    <Navbar.Text style={{margin:"10px"}}>
                        {formmattedDate}
                    </Navbar.Text>
                </li>
                <li class="nav-item">
                    <BsFillClockFill/>
                    <Navbar.Text  style={{margin:"10px"}}>
                        {formattedTime}
                    </Navbar.Text>
                </li>
                </ul>
                <span class="navbar-text">
                    <a class="nav-link" href="#"> <BsFillDoorOpenFill/> Log out</a>
                </span>
            </div>
        </Navbar>
    );
}

export default Header;

/*
<Navbar.Brand>Hello, Chin</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
        <BsFillCalendar2MinusFill/>
      <Navbar.Text style={{margin:"10px"}}>
        {formmattedDate}
      </Navbar.Text>
      <BsFillClockFill/>
      <Navbar.Text  style={{margin:"10px"}}>
        {formattedTime}
      </Navbar.Text>
      <BsFillDoorOpenFill/>
      <Navbar.Text  style={{marginLeft:"10px"}}>
        Log Out
      </Navbar.Text>
    </Navbar.Collapse>
*/