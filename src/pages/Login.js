import React, { useState, useRef,useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef()
  const navigate = useNavigate();
const authCtx=useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
 
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTZQtTYs12UMCSLl27RvELtCVu-SK81UQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTZQtTYs12UMCSLl27RvELtCVu-SK81UQ";
    }
    fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication failed!";
          alert(errorMessage);
          throw new Error(errorMessage)
        });
      }
    })
    .then((data)=>{
     authCtx.login(data.idToken)
     navigate("/logindirect")

    })
    .catch((err)=>{
      alert(err.message)
    })
  };

  
   /*confirm password */
   const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  return (
    <Container className="bg-dark  text-uppercase fw-bold border border-4 rounded-5 bg-dark border-info text-center text-warning mt-3">
    <h1 className="bg-dark fw-bold p-1 text-warning border rounded-bottom rounded-4 mt-3 border-5 border-info">
      {isLogin ? "LOGIN" : "SIGN UP"}
    </h1>
    <Row>
      <Col>
        <img
          className="m-3 rounded-4 border border-5  "
          src="https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      </Col>
      <Col className="p-5">
        <Form onSubmit={submitHandler }>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={input.email}
              onChange={onInputChange}
              ref={emailInputRef}
              id="email"
              required
              onBlur={validateInput}
              name="email"
            />
          </Form.Group>
          {error.email && <span className="err">{error.email}</span>}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              ref={passwordInputRef}
              id="password"
              onChange={onInputChange}
              required
              onBlur={validateInput}
            />
          </Form.Group>
          {error.password && <span className="err">{error.password}</span>}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              required
              onBlur={validateInput}
            />
          </Form.Group>
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
          {!isLoading && (
            <Button type="submit" className="px-5 text-uppercase text-dark fw-bold bg-info">
            {isLogin ? "Login" : "Create account"}
          </Button>
          )}
          {isLoading && <p>Sending request...</p>}
           
          
          <Button 
            className="px-2 mx-2 text-uppercase bg-info text-dark fw-bold"
            onClick={switchAuthModeHandler}
          >
          {isLogin ? "Don't have an account ? Sign up" : "Login with existing account"}
          </Button>
          {isLogin && <Button className="m-2 px-2 bg-danger">Forgot Password</Button>}
        </Form>
      </Col>
    </Row>
  </Container>
  );
};


export default Login