import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import Paper from "@mui/material/Paper";
import AddVehicleDialog from "./AddVehicleDialog";
import AddPolicyDialog from "./AddPolicyDialog";

function HomePage(props) {
  const [vehicleData, setVehicleData] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(-1);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  const handleAddVehicleClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = (isVehicleAdded=false) => {
    setIsAddDialogOpen(false);
    isVehicleAdded && getVehiclesById();
  };

  const handleAddPolicy = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setIsPolicyDialogOpen(true);
  }

  const addPolicyClose = () => {
    setIsPolicyDialogOpen(false);
  }

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    } else {
      getVehiclesById();
    }
  }, [state]);

  const getVehiclesById = () => {
    const url = `https://localhost:44352/api/vehicle/get-vehicle-by-id/${state[0].id}`;
    axios
      .get(url)
      .then((result) => {
        setVehicleData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="homepage-wrapper">
      <div className="navbar">
        <div className="navbar-left">
          <h2>{`Welcome ${state[0].name}`}</h2>
        </div>
        <div className="navbar-right">
          <Button
            className="btn"
            variant="contained"
            onClick={handleAddVehicleClick}
          >
            Add Vehicle
          </Button>

          <Button
            className="btn"
            variant="contained"
            //onClick={() => handleLogout()}
          >
            My Claims
          </Button>

          <Button
            className="btn"
            variant="contained"
            onClick={() => handleLogout()}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <Paper className="userdetails" elevation={3}>
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
        />
        <p className="text">{`Age : ${state[0].age}`}</p>
        <p className="text">{`Phone : ${state[0].phone}`}</p>
        <p className="text">{`Address : ${state[0].address}`}</p>
      </Paper>
      <Paper className="vehicles" elevation={3}>
        <table>
          <tr>
            <th>Serial No.</th>
            <th>Vehicle No.</th>
            <th>Registration No.</th>
            <th>Type</th>
            <th>Model</th>
            <th>Action</th>
          </tr>
          {vehicleData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.vehicleNo}</td>
              <td>{item.registrationNo}</td>
              <td>{item.vehicleType}</td>
              <td>{item.vehicleModel}</td>
              <td>
                <Button
                  className="btn"
                  variant="contained"
                  onClick={() => handleAddPolicy(item.id)}
                >
                  Add Policy
                </Button>
              </td>
            </tr>
          ))}
        </table>
      </Paper>
      <AddVehicleDialog
        isOpen={isAddDialogOpen}
        handleClose={(val) => handleAddDialogClose(val)}
        userId={state[0].id}
      />
      <AddPolicyDialog
        isOpen={isPolicyDialogOpen}
        handleClose={addPolicyClose}
        vehicleId={selectedVehicleId}
      />
    </div>
  );
}

export default HomePage;
