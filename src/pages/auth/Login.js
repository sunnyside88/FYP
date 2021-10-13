import {Card,Button,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';

const Login = () =>{
  const handleLogIn = () =>{
    
  }
  return(
  <Container className="d-flex vh-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Card>
      <Card.Body>
        <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
          <img style={{width:"50%"}} src={logo}/>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
      </div>
      <Link to="/register">Don't have an account?</Link>
      <div className="d-flex justify-content-center">
        <Button onClick={handleLogIn} style={{display: "flex",justifyContent: "center",alignItems: "center"}} variant="primary">Sign In</Button>
      </div>
      </Card.Body>
    </Card>
    </Container>
);
  }
  
export default Login;