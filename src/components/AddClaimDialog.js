import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import './AddVehicleDialog.scss'

function AddClaimDialog(props) {
  const navigate = useNavigate();
  const vehicleId = props.vehicleId;
  const [licenseNo, setLicenseNo] = useState("");
  const [dateOfAccident, setDateOfAccident] = useState("");
  const [driverName, setDriverName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const status = "PENDING";
  const userId = props.userId;

  useEffect (() =>{
    if(licenseNo && dateOfAccident && driverName){
      setDisabled(false);
    }
    else{
        setDisabled(true);
    }

  },[licenseNo, dateOfAccident, driverName])

  const handleLicenseNo = (value) => {
    setLicenseNo(value);
  };

  const handleDateOfAccident = (value) => {
    setDateOfAccident(value);
  };

  const handleDriverName = (value) => {
    setDriverName(value);
  };

  const handleClaimAdd = () => {
    const data = {
      licenseNo: licenseNo,
      dateOfAccident: dateOfAccident,
      driverName: driverName,
      status: status,
      userId: userId,
      vehicleId: vehicleId
    };
    const url = "https://localhost:5001/api/claims/add-claim";
    axios
      .post(url, data)
      .then((result) => {
        props.handleClose(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Dialog onClose={props.handleClose} open={props.isOpen}>
      <DialogTitle>Add Claim</DialogTitle>
      <form className="form">
      <TextField
          onChange={(e) => handleLicenseNo(e.target.value)}
          className="textfield"
          label="License No."
          value={licenseNo}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleDateOfAccident(e.target.value)}
          className="textfield"
          type="date"
          label="Date of Accident"
          value={dateOfAccident}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleDriverName(e.target.value)}
          className="textfield"
          label="Driver's Name"
          value={driverName}
          variant="outlined"
          size="small"
          required
        />  
      </form>
      <div className="buttons-group">
        <Button className="btn" variant="outlined" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => handleClaimAdd()}
          disabled={disabled}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}
export default AddClaimDialog;
