import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import './AddVehicleDialog.scss'

function AddPolicyDialog(props) {
  const navigate = useNavigate();
  const vehicleId = props.vehicleId;
  const [policyName, setPolicyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    const url = "https://localhost:44352/api/policy/add-policy";
    axios
      .post(url, data)
      .then((result) => {
        props.handleClose();
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
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleStartDateChange(e.target.value)}
          className="textfield"
          type="date"
          label="Start Date"
          variant="outlined"
          size="small"
          required
        />
        <TextField
          onChange={(e) => handleEndDateChange(e.target.value)}
          className="textfield"
          type="date"
          label="End Date"
          variant="outlined"
          size="small"
          required
        />  
      </form>
      <div className="buttons">
        <Button className="btn" variant="outlined" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => handlePolicyAdd()}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}
export default AddPolicyDialog;
