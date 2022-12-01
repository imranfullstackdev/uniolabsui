import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  //  email, password,
  const changeHandler = (e) => {
    setuserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userLogin.email || !userLogin.password) {
      toast.warn("DATA NOT FILLED PROPERLY", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const LoginUser = await fetch("http://localhost:8000/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLogin),
        });
        const res = await LoginUser.json();
        console.log(res);
        localStorage.setItem("Token", res.token);
        toast.success(res.mess, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate('/ViewDish')
      } catch (err) {
        console.log(err);
      }
    }
    console.log(userLogin);
  };
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center border-2">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userLogin.email}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userLogin.password}
              onChange={changeHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
