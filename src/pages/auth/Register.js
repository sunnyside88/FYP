import {Card,Button,Container,Toast,ToastContainer} from 'react-bootstrap'
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import {auth} from '../../firebase.js'

const Register = () =>{
  const [email,setEmail] = useState("");
  const [isSuccessRegister,setIsSuccessRegister] = useState();

  const handleRegister = async (e) =>{
    e.preventDefault()
    const config = {
      url:'http://localhost:3000/register/complete',
      handleCodeInApp:true,
    }

    try{
      await auth.sendSignInLinkToEmail(email,config)
      setIsSuccessRegister(true)
      //xxx: to be continue the coding
    }catch(err){
      if(err){
        setIsSuccessRegister(false)
      }
    }
  }

  const toastSuccessEmailLink = () =>{
    return(
    <Toast bg="success">
      <Toast.Header>
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Successfully registered!Email is send to ${email}</Toast.Body>
    </Toast>
    );
  }

  const toastUnsuccessEmailLink = () =>{
    return(
    <ToastContainer className="p-3" position="top-end">
      <Toast bg="danger" animation={true}>
        <Toast.Body>Please enter a valid email address!</Toast.Body>
      </Toast>
    </ToastContainer>
    );
  }

  return(
    <div>
      {isSuccessRegister===true?toastSuccessEmailLink():""}
      {isSuccessRegister===false?toastUnsuccessEmailLink():""}
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
    </div>
  );
}
  
export default Register;