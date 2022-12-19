import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";


function Registration() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [disabled, setDisabled] = useState(true);
  const role= "user";
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  useEffect (() =>{
      if(name && address && email && password && dob){
        setDisabled(false);
      }
      else{
          setDisabled(true);
      }

  },[name, address, email, password, dob])

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handlePhoneChange = (value) => {
    if(value.length <= 10)
    {
      setPhone(value);
    } 
  };

  const handleDobChange = (value) => {
    setDob(value);
    const today = new Date();
    const birthDate = new Date(value);
    const age_now = today.getFullYear() - birthDate.getFullYear();
    setAge(age_now);
  };

  const handleSignin = () => {
      navigate("/Login", {replace: true});
  }
 
  const handleSave = () => {
    const data = {
      name: name,
      address: address,
      email: email,
      password: password,
      age: age,
      phone: phone,
      role: role,
      dob: dob,
    };
    const url = "https://localhost:5001/api/user/add-user";
    axios
      .post(url, data)
      .then((result) => {
        alert("success");
        navigate("/Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="registration-container">
      <Paper className="registration-subcontainer" elevation={3}>
        <div className="header">
          <img className="logo" src="https://cdn-icons-png.flaticon.com/512/4437/4437642.png" />
          <div>Insurance Claim Management</div>
        </div>
        <div className="form-title">Sign Up</div>
        <div className="body">
          <form className="form">
            <TextField
              onChange={(e) => handleNameChange(e.target.value)}
              className="textfield"
              label="Name"
              value={name}
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handleAddressChange(e.target.value)}
              className="textfield"
              value={address}
              label="Address"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handleEmailChange(e.target.value)}
              className="textfield"
              label="E-mail"
              value={email}
              variant="outlined"
              size="small"
              error= {!!(email.length && !(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email))}
              helperText = {email.length && !(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email) ? "Please enter a valid e-mail" : ""}
              required
            />
            <TextField
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="textfield"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              size="small"
              error= {!!(password.length && (password.length<5 || password.length>10))}
              helperText= {password.length && (password.length<5 || password.length>10) ? "Password length should be between 5 to 10 characters" : "" }
              required
            />
            <TextField
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="textfield"
              label="Phone"
              value={phone}
              variant="outlined"
              size="small"
              error= {!!(phone.length && (phone.length !== 10))}
              helperText= {phone.length && (phone.length !== 10) ? "Phone number not valid" : "" }
              type= "number"
              required
            />
            <TextField
              onChange={(e) => handleDobChange(e.target.value)}
              type="date"
              value={dob}
              className="textfield"
              label="Dob"
              variant="outlined"
              size="small"
              required
            />
          </form>
        </div>
        <div className="buttons">
          <Button className="btn" onClick={() => handleSignin()} variant="text">
            Already have an account? Sign In
          </Button>
          <Button
            className="btn primary"
            onClick={() => handleSave()}
            variant="contained"
            disabled={disabled}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Registration;
