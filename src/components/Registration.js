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
    setPhone(value);
  };

  const handleDobChange = (value) => {
    setDob(value);
    const today = new Date();
    const birthDate = new Date(value);
    const age_now = today.getFullYear() - birthDate.getFullYear();
    // console.log(age_now);
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
    const url = "https://localhost:44352/api/user/add-user";
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
        <div className="header">Sign Up</div>
        <div className="body">
          <form className="form">
            <TextField
              onChange={(e) => handleNameChange(e.target.value)}
              className="textfield"
              label="Name"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handleAddressChange(e.target.value)}
              className="textfield"
              label="Address"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handleEmailChange(e.target.value)}
              className="textfield"
              label="E-mail"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="textfield"
              type="password"
              label="Password"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="textfield"
              label="Phone"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => handleDobChange(e.target.value)}
              type="date"
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
            Sign In
          </Button>
          <Button
            className="btn"
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
