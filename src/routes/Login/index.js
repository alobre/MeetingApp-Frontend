import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import style from "./style.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const users = [{ username: "ana", password: "ana" }];
  const errors = {
    uname: "Invalid username",
    pass: "Invalid password",
  };

  // on "submit" button compare the entries against the "database" (const users) and if there is a user, log them in, save authorization in localStorage and dispatch an event for AppBar to listen to (and show login/logout button)
  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account) {
      if (account.password === password) {
        localStorage.setItem("authenticated", true);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        // invalid pass
        setErrorMessages({ name: "pass", message: errors.pass });
      }
    } else {
      // invalid username
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // display error messages for invalid entries
  const showErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // check for authenticated
  const authenticated = localStorage.getItem("authenticated") === "true";

  // the login form
  return (
    <div>
      <div className="title">FHTW LOGIN</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            required
            id="outlined-required-username"
            label="Username"
            type="text"
            name="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          {showErrorMessage("uname")}
        </div>
        <div className="input-container">
          <TextField
            required
            id="outlined-required-password"
            label="Password"
            type="password"
            name="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          {showErrorMessage("pass")}
        </div>
        <div className="button-container">
          <Button variant="contained" type="submit" value="Submit">
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginScreen;
