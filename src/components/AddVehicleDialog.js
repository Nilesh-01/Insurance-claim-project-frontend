import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
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
    const url = "https://localhost:44352/api/vehicle/add-vehicle";
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
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleRegistrationNoChange(e.target.value)}
          className="textfield"
          label="Registration No."
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleVehicleTypeChange(e.target.value)}
          className="textfield"
          label="Vehicle Type"
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleVehicleModelChange(e.target.value)}
          className="textfield"
          label="Vehicle Model"
          variant="outlined"
          size="small"
          required
        />
      </form>
      <div className="buttons">
        <Button className="btn" variant="outlined" onClick={() => props.handleClose()}>
          Cancel
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => handleVehicleAdd()}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}
export default AddVehicleDialog;
