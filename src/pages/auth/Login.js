import { Card, Button, Container, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../assets/Logo.png';
import { auth, googleAuthProvider } from '../../firebase.js'
import { toast } from 'react-toastify';
import '../../sass/auth/auth-sass.scss'

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      var res = await auth.signInWithEmailAndPassword(email, password)
      const { user } = res
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/')
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleForgetPassword = () =>{
    history.push("/login/forget-password")
  }

  const googleLogin = async () => {
    try {
      var result = await auth.signInWithPopup(googleAuthProvider)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }

  }

  useEffect(() => {

  }, [])

  return (
    <Container className="d-flex vh-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "50%" }} src={logo} alt="logo" />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Link onClick={handleForgetPassword} style={{fontSize:14, marginLeft:250}} to="#">Forgot your password?</Link> 
            <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Link style={{fontSize:14}} to="/register">Don't have an account?</Link>
          <div className="justify-content-center">
            <Button onClick={handleLogIn} style={{ width: "100%", marginBottom:20 }} variant="primary">Sign In
              {isLoading === true ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : ""}
            </Button>
          </div>
          <div style={{display:"flex"}}>
            <hr style={{backgroundColor:"#6C6A61", height:1 , width:"30%", marginLeft:0, whiteSpace:"nowrap"}}></hr>
            <label>or sign in with</label>
            <hr style={{backgroundColor:"#6C6A61", height:1 , width:"30%", marginRight:0}}></hr> 
          </div>
          <div className="justify-content-center">
            <Button variant="outline-primary"  onClick={googleLogin} style={{ width: "100%", marginBottom:20}}>
            <img src="https://img.icons8.com/color/20/000000/google-logo.png" style={{marginRight:10}}/>
              Google
            </Button>
          </div>   
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;