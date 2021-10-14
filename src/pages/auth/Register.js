import {Card,Button,Container,Toast,ToastContainer,Spinner} from 'react-bootstrap'
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import {auth} from '../../firebase.js'

const Register = () =>{
  const [email,setEmail] = useState("");
  const [isSuccessRegister,setIsSuccessRegister] = useState();
  const [isLoading,setIsLoading] = useState(false);

  const handleRegister = async (e) =>{
    e.preventDefault()
    const config = {
      url:'http://localhost:3000/register/complete',
      handleCodeInApp:true,
    }
    setIsLoading(true)
    try{
      await auth.sendSignInLinkToEmail(email,config)
      setIsSuccessRegister(true)
      //xxx: to be continue the coding
    }catch(err){
      if(err){
        console.log("err",err)
        setIsSuccessRegister(false)
      }
    }
    finally{
      setIsLoading(false)
    }
  }

  const toastSuccessEmailLink = () =>{
    return(
    <ToastContainer className="p-3" position="top-end">
      <Toast bg="success" animation={true}>
        <Toast.Body>Successfully registered!Email is send to {email}</Toast.Body>
      </Toast>
    </ToastContainer>
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
            <Button onClick={handleRegister} style={{display: "flex",justifyContent: "center",alignItems: "center"}} variant="primary">
              Sign Up
              {isLoading===true?<Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />:""}
            </Button>
          </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
  
export default Register;