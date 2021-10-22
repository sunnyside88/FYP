import React, {useEffect,useState} from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Container } from "reactstrap";
import moment from "moment";
import { BsFillClockFill,BsFillCalendar2MinusFill } from "react-icons/bs";

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
        <Navbar style={{height:"45px"}}>
  <Container>
    <Navbar.Brand>Hello Chin</Navbar.Brand>
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
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
}

export default Header;

