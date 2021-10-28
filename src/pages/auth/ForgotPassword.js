import { Card, Button, Container, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clipInternetSecurity from '../../assets/clip-internet-security.png';
import { auth, googleAuthProvider } from '../../firebase.js'
import { toast } from 'react-toastify';
import '../../sass/auth/auth-sass.scss'

const ForgotPassword = () => {

    return (
        <Container className="vh-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: '70rem' }}>
                <Card.Body>
                    <div class="row">
                        <div class="col">
                            <img style={{ width: "100%" }} src={clipInternetSecurity} alt="clip-internet-security.png" />
                        </div>
                        <div style={{ paddingTop:"20px" }} class="col">
                            <h1>Forgot your password?</h1>
                            <br/ >
                            <h3>Dont' worry, we got you.</h3>
                            <br/ >
                            <p>Enter the email address associated with your account</p>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="text-center">
                            <Button  style={{ width: "50%", marginBottom:20 }} variant="primary">Send</Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ForgotPassword;