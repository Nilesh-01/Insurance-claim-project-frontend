import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import './AddVehicleDialog.scss'

function AddVehicleDialog(props) {
  const navigate = useNavigate();
  const userId = props.userId;
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect (() =>{
    if(vehicleType && vehicleModel && vehicleNo && registrationNo){
      setDisabled(false);
    }
    else{
        setDisabled(true);
    }

  },[vehicleType, vehicleModel, vehicleNo, registrationNo])

  const handleVehicleTypeChange = (value) => {
    setVehicleType(value);
  };

  const handleVehicleModelChange = (value) => {
    setVehicleModel(value);
  };

  const handleVehicleNoChange = (value) => {
    setVehicleNo(value);
  };

  const handleRegistrationNoChange = (value) => {
    setRegistrationNo(value);
  };

  const handleVehicleAdd = () => {
    const data = {
      vehicleType: vehicleType,
      vehicleModel: vehicleModel,
      vehicleNo: vehicleNo,
      registrationNo: registrationNo,
      userId: userId,
    };
    const url = "https://localhost:5001/api/vehicle/add-vehicle";
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
    <Dialog onClose={() => props.handleClose()} open={props.isOpen}>
      <DialogTitle>Add Vehicle</DialogTitle>
      <form className="form">
        <TextField
          onChange={(e) => handleVehicleNoChange(e.target.value)}
          className="textfield"
          label="Vehicle No."
          value={vehicleNo}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleRegistrationNoChange(e.target.value)}
          className="textfield"
          label="Registration No."
          value={registrationNo}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleVehicleTypeChange(e.target.value)}
          className="textfield"
          label="Vehicle Type"
          value={vehicleType}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleVehicleModelChange(e.target.value)}
          className="textfield"
          label="Vehicle Model"
          value={vehicleModel}
          variant="outlined"
          size="small"
          required
        />
      </form>
      <div className="buttons-group">
        <Button className="btn" variant="outlined" onClick={() => props.handleClose()}>
          Cancel
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => handleVehicleAdd()}
          disabled={disabled}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}
export default AddVehicleDialog;
