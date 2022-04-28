import { Card, Button, Container, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Logo.png";
import ForgotPassword from "./ForgotPassword";
import { auth, googleAuthProvider } from "../../firebase.js";
import { toast } from "react-toastify";
import "../../sass/auth/auth-sass.scss";
import axios from "axios";
import { Input } from "antd";

const createOrUpdateUser = async (userToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/create-or-update-user`,
    {},
    {
      headers: {
        userToken,
      },
    }
  );
};

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useSelector((state) => ({ ...state }));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user, "xxxuser");
  });
  const handleLogIn = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      var res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();

      await createOrUpdateUser(idTokenResult)
        .then((res) => console.log("fe:create or update user", res))
        .catch((err) => {
          toast.error(err);
        });

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (err) {
      setIsLoading(false)
      console.log(err, "errlogin");
      alert(err);
      toast.error(err);
    }
  };

  const googleLogin = async () => {
    try {
      var result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <ForgotPassword></ForgotPassword>
        </Modal.Body>
      </Modal>
      <Container
        className="d-flex vh-100"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <Card.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img style={{ width: "50%" }} src={logo} alt="logo" />
            </div>
            <div className="form-group">
              <label>Email address</label>
              {/* <input type="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} /> */}
              <Input
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <Input.Password
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="justify-content-center">
              <Button
                onClick={handleLogIn}
                style={{ width: "100%", marginBottom: 20 }}
                variant="primary"
              >
                Sign In
                {isLoading === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              <hr
                style={{
                  backgroundColor: "#6C6A61",
                  height: 1,
                  width: "30%",
                  marginLeft: 0,
                  whiteSpace: "nowrap",
                }}
              ></hr>
              <label>or sign in with</label>
              <hr
                style={{
                  backgroundColor: "#6C6A61",
                  height: 1,
                  width: "30%",
                  marginRight: 0,
                }}
              ></hr>
            </div>
            <div className="justify-content-center">
              <Button
                variant="outline-primary"
                onClick={googleLogin}
                style={{ width: "100%", marginBottom: 20 }}
              >
                <img
                  src="https://img.icons8.com/color/20/000000/google-logo.png"
                  style={{ marginRight: 10 }}
                />
                Google
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
