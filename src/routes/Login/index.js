import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, Typography, Button, Card } from "@mui/material";
import handleLogin from '../../global/functions/handleLogin.js'
import style from "./style.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setErrorMessage] = useState("");

  const login = (username, password) =>{
    const result = handleLogin(username, password)
    console.log(result)
    result.success ? navigate('/') : setErrorMessage(result.error)
  }

  const ErrorComponent = () =>(<div className="error">{error.msg}</div>)

  // check for authenticated
  const authenticated = localStorage.getItem("authenticated") === "true";

  // the login form
  return (
    <div id="loginParent">
      <Card id="cardParent">
      <Typography variant="h2" gutterBottom>FHTW LOGIN</Typography>
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
          {error.type == "uname" && <ErrorComponent error={error}/>}
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
          {error.type == "pass" && <ErrorComponent error={error}/>}
        </div>
        <div className="button-container">
          <Button variant="contained" type="submit" value="Submit" onClick={()=>login(username, password)}>
            LOGIN
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default LoginScreen;
