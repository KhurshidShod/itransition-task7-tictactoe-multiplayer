import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import  { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Register({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = async () => {

    console.log(user)
   await Axios.post("https://itransition-task7-tictactoe.herokuapp.com/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp">
      <label> Sign Up</label>
      <Form>
      <Form.Control
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <Form.Control
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <Form.Control
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <Form.Control
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      </Form>
      <Button variant="primary" onClick={signUp}> Sign Up</Button>
    </div>
  );
}

export default Register;
