import { Card, Button, Container, Spinner, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clipInternetSecurity from '../../assets/clip-internet-security.png';
import { auth, googleAuthProvider } from '../../firebase.js'
import { toast } from 'react-toastify';
import '../../sass/auth/auth-sass.scss'

const ForgotPassword = () => {
    const[email,setEmail] = useState("")


    const handleSend = async () =>{
        try{
            if(!email){
                toast.error("Missing email!")
                return
            }
            await auth.sendPasswordResetEmail(email)
            toast.success("Password reset email sent!")
        }catch(err){
            toast.error(err.message)
            console.log(err.message)
        }
    }

    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" , width:"100%",padding:0}}>
            <Card style={{ width: '80rem' }}>
                <Card.Body>
                    <div className="row">
                        <div className="col">
                            <img style={{ width: "100%" }} src={clipInternetSecurity} alt="clip-internet-security.png" />
                        </div>
                        <div style={{ paddingTop:"20px" }} className="col">
                            <h1>Forgot your password?</h1>
                            <br/ >
                            <h3>Dont' worry, we got you.</h3>
                            <br/ >
                            <p>Enter the email address associated with your account</p>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="text-center">
                            <Button  onClick={handleSend} style={{ width: "50%", marginBottom:20 }} variant="primary">Send</Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ForgotPassword;