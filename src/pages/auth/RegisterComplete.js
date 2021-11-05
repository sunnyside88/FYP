import {Card,Button,Container} from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import logo from '../../assets/Logo.png';
import {auth} from '../../firebase.js'
import { toast } from 'react-toastify';

const RegisterComplete = ({history}) =>{
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  useEffect(()=>{
      setEmail(localStorage.getItem("emailForRegistration"))
  },[])

  const handleComplete = async (e) =>{
      try{
          if(!email || !password){
              toast.error("Missing email or password!")
              return
          }
          if(password.length<6){
              toast.error("Password must be more than 6-digits!")
              return
          }
          const result = await auth.signInWithEmailLink(email,window.location.href)
          if(result.user.emailVerified){
              localStorage.removeItem("emailForRegistration")
              const user = auth.currentUser
              user.updatePassword(password)
              const idTokenResult = await user.getIdTokenResult()
              console.log("user_id_token",idTokenResult)
              toast.success("Registration Completed!")
              history.push('/login')
          }
      }catch(err){
        console.log(err)
        toast.error(err.message)
      }
  }

  return(
    <div>
      <Container className="d-flex vh-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Card.Body>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
              <img style={{width:"50%"}} src={logo} alt="Logo"/>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" value={email} placeholder="Enter email" disabled />
              <br/ >
              <label>Password</label>
              <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" autoFocus/>
            </div>
          <div className="d-flex justify-content-center">
            <Button onClick={handleComplete} style={{display: "flex",justifyContent: "center",alignItems: "center"}} variant="primary">
              Complete Register
            </Button>
          </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
  
export default RegisterComplete;