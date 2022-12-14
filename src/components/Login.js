import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setError(false);
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setError(false);
    setPassword(value);
  };

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    const url = "https://localhost:44352/api/user/login";
    axios
      .post(url, data)
      .then((result) => {
        console.log(result.data);
        if(!result.data.length)
        {
            setError(true);
        }
        else{
            navigate("/HomePage", {state:result.data, replace: true});
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="registration-container">
      <Paper className="registration-subcontainer" elevation={3}>
        <div className="header">Sign In</div>
        <div className="body">
          <form className="form">
            <TextField
              onChange={(e) => handleEmailChange(e.target.value)}
              type="email"
              className="textfield"
              label="E-mail"
              variant="outlined"
              size="small"
            />
            <TextField
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="textfield"
              type="password"
              label="Password"
              variant="outlined"
              size="small"
            />
            
          </form>
        </div>
        {error && <div className="error" >
            Wrong Credentials
          </div>}
        <div className="buttons">
          <Button className="btn" variant="contained" onClick={() => handleLogin()}>
            Sign In
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
