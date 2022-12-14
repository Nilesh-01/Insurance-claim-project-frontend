import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import './AddVehicleDialog.scss'

function AddPolicyDialog(props) {
  const navigate = useNavigate();
  const vehicleId = props.vehicleId;
  const [policyName, setPolicyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect (() =>{
    if(policyName && startDate && endDate){
      setDisabled(false);
    }
    else{
        setDisabled(true);
    }

  },[policyName, startDate, endDate])

  const handlePolicyNameChange = (value) => {
    setPolicyName(value);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handlePolicyAdd = () => {
    const data = {
      policyName: policyName,
      startDate: startDate,
      endDate: endDate,
      vehicleId: vehicleId
    };
    const url = "https://localhost:5001/api/policy/add-policy";
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
      <DialogTitle>Add Policy</DialogTitle>
      <form className="form">
      <TextField
          onChange={(e) => handlePolicyNameChange(e.target.value)}
          className="textfield"
          label="Policy Name"
          value={policyName}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleStartDateChange(e.target.value)}
          className="textfield"
          type="date"
          label="Start Date"
          value={startDate}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleEndDateChange(e.target.value)}
          className="textfield"
          type="date"
          value={endDate}
          label="End Date"
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
          onClick={() => handlePolicyAdd()}
          disabled={disabled}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}
export default AddPolicyDialog;
