import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import  { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="login">
      <label> Login</label>
    <Form>
      <Form.Control
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <Form.Control
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      </Form>
      <Button variant='primary' onClick={login}> Login</Button>
    </div>
  );
}

export default Login;