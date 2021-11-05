import {Card,Button,Container,Toast,ToastContainer,Spinner} from 'react-bootstrap'
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import {auth} from '../../firebase.js'
import { toast } from 'react-toastify';

const Register = () =>{
  const [email,setEmail] = useState("");
  const [isSuccessRegister,setIsSuccessRegister] = useState();
  const [isLoading,setIsLoading] = useState(false);

  const handleRegister = async (e) =>{
    e.preventDefault()
    const config = {
      url:"http://localhost:3000/register/complete",
      handleCodeInApp:true,
    }
    setIsLoading(true)
    try{
      await auth.sendSignInLinkToEmail(email,config)
      toast.success("Registration link is sent to your mailbox!")
      localStorage.setItem('emailForRegistration',email);
    }catch(err){
      if(err){
        console.log("err",err)
        toast.error(err)
      }
    }
    finally{
      setIsLoading(false)
    }
  }

  return(
    <div>
      <Container className="d-flex vh-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Card.Body>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
              <img style={{width:"50%"}} src={logo} alt="logo" />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" autoFocus />
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