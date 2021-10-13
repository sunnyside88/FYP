import {Card,Button,Container,Toast} from 'react-bootstrap'
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import {auth} from '../../firebase.js'
import { logDOM } from '@testing-library/dom';

const Register = () =>{
  const [email,setEmail] = useState("");

  const handleRegister = async (e) =>{
    e.preventDefault()
    const config = {
      url:'http://localhost:3000/register/complete',
      handleCodeInApp:true,

    }

    //await auth.sendSignInLinkToEmail(email,config)
    alert("hi")
    toastSuccessEmailLink()
  }

  const toastSuccessEmailLink = () =>{
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Successfully registered!Email is send to ${email}</Toast.Body>
    </Toast>
  }

  return(
    <Container className="d-flex vh-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card>
        <Card.Body>
          <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <img style={{width:"50%"}} src={logo} />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
          </div>
        <div className="d-flex justify-content-center">
          <Button onClick={handleRegister} style={{display: "flex",justifyContent: "center",alignItems: "center"}} variant="primary">Sign Up</Button>
        </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
  
export default Register;