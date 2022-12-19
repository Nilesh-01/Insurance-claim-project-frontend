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
    const url = "https://localhost:5001/api/user/login";
    axios
      .post(url, data)
      .then((result) => {
        if (!result.data.length) {
          setError(true);
        } else {
          if (result.data[0].role == "Admin") {
            navigate("/AdminHomePage", { state: result.data, replace: true });
          } else {
            navigate("/HomePage", { state: result.data, replace: true });
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="registration-container">
      <Paper className="registration-subcontainer" elevation={3}>
        <div className="header">
          <img
            className="logo"
            src="https://cdn-icons-png.flaticon.com/512/4437/4437642.png"
          />
          <div>Insurance Claim Management</div>
        </div>
        <div className="form-title">Sign In</div>
        <div className="body">
          <form className="form">
            <TextField
              onChange={(e) => handleEmailChange(e.target.value)}
              type="email"
              className="textfield"
              label="E-mail"
              value={email}
              variant="outlined"
              size="small"
              error= {!!(email.length && !(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email))}
              helperText = {email.length && !(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email) ? "Please enter a valid e-mail" : ""}
            />
            <TextField
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="textfield"
              type="password"
              label="Password"
              value={password}
              variant="outlined"
              size="small"
              error= {!!(password.length && (password.length<5 || password.length>10))}
              helperText= {password.length && (password.length<5 || password.length>10) ? "Password length should be between 5 to 10 characters" : "" }
            />
          </form>
        </div>
        {error && <div className="error">Wrong Credentials</div>}
        <div className="buttons">
        <Button
            className="btn"
            variant="text"
            onClick={() => navigate("/", {replace: true})}
          >
            Don't have an account? Register
          </Button>
          <Button
            className="btn primary"
            variant="contained"
            onClick={() => handleLogin()}
            disabled={!email.length || !password.length}
          >
            Sign In
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
