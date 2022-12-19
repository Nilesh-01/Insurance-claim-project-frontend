import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import Paper from "@mui/material/Paper";
import AddVehicleDialog from "./AddVehicleDialog";
import AddPolicyDialog from "./AddPolicyDialog";
import AddClaimDialog from "./AddClaimDialog";

function HomePage(props) {
  const [vehicleData, setVehicleData] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [isClaimsDialogOpen, setIsClaimsDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(-1);
  const [claimsVehicleId, setClaimsVehicleId] = useState([]); //array of vehicle id from Claims Table
  const [policyVehicleId, setPolicyVehicleId] = useState([]); //array of vehicle id from Policy Table
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  const handleAddVehicleClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = (isVehicleAdded = false) => {
    setIsAddDialogOpen(false);
    isVehicleAdded && getVehiclesByUserId();
  };

  const handleAddPolicy = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setIsPolicyDialogOpen(true);
  };

  const handleAddClaimClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setIsClaimsDialogOpen(true);
  };

  const addPolicyClose = (isPolicyAdded = false) => {
    setIsPolicyDialogOpen(false);
    isPolicyAdded && getVehiclesByUserId();
  };

  const addClaimClose = (isClaimAdded = false) => {
    setIsClaimsDialogOpen(false);
    isClaimAdded && getVehiclesByUserId();
  };

  const getAllClaims = () => {
    const url = "https://localhost:5001/api/claims/get-all-claims";
    axios
      .get(url)
      .then((result) => {
        const vechileIds = result.data.map((item) => ({
          vehicleId: item.vehicleId,
          status: item.status,
        }));
        setClaimsVehicleId(vechileIds);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getAllPolicy = () => {
    const url = "https://localhost:5001/api/policy/get-all-policy";
    axios
      .get(url)
      .then((result) => {
        const vechileIds = result.data.map((item) => item.vehicleId);
        setPolicyVehicleId(vechileIds);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    } else {
      getVehiclesByUserId();
    }
  }, [state]);

  const getVehiclesByUserId = () => {
    const url = `https://localhost:5001/api/vehicle/get-vehicle-by-userId/${state[0].id}`;
    axios
      .get(url)
      .then((result) => {
        setVehicleData(result.data);
        getAllPolicy();
        getAllClaims();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="homepage-wrapper">
      <div className="navbar">
        <div className="navbar-left">
          <div className="header">
            <img
              className="logo"
              src="https://cdn-icons-png.flaticon.com/512/4437/4437642.png"
            />
            <div>Insurance Claim Management</div>
          </div>
          {/* <h2>{`Welcome ${state[0].name}`}</h2> */}
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
            onClick={() => handleLogout()}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <Paper className="userdetails" elevation={3}>
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/1144/1144709.png"
        />
        <div className="details">
          <p className="text">
            <span>Name :</span>
            {` ${state[0].name}`}
          </p>
          <p className="text">
            <span>Age :</span>
            {` ${state[0].age}`}
          </p>
          <p className="text">
            <span>Phone :</span>
            {` ${state[0].phone}`}
          </p>
          <p className="text">
            <span>Address :</span>
            {` ${state[0].address}`}
          </p>
        </div>
      </Paper>
      <Paper className="vehicles" elevation={3}>
        <div className="title">Vehicle Details</div>
        <table>
          <tr>
            <th>Serial No.</th>
            <th>Vehicle No.</th>
            <th>Registration No.</th>
            <th>Type</th>
            <th>Model</th>
            <th>Action</th>
            <th>Claims</th>
          </tr>
          {vehicleData?.map((item, index) => {
            const currentVehicleStatus = claimsVehicleId?.find((val) => val.vehicleId === item.id)?.status;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.vehicleNo}</td>
                <td>{item.registrationNo}</td>
                <td>{item.vehicleType}</td>
                <td>{item.vehicleModel}</td>
                <td>
                  {!policyVehicleId?.includes(item.id) ? (
                    <Button
                      className="btn table-button"
                      variant="contained"
                      onClick={() => handleAddPolicy(item.id)}
                    >
                      Add Policy
                    </Button>
                  ) : (
                    <div className="chip added">Policy Added</div>
                  )}
                </td>
                <td>
                  {claimsVehicleId?.findIndex(
                    (val) => val.vehicleId === item.id
                  ) === -1 ? (
                    <Button
                      className="btn table-button"
                      variant="contained"
                      onClick={() => handleAddClaimClick(item.id)}
                      disabled={!policyVehicleId?.includes(item.id)}
                    >
                      Add Claim
                    </Button>
                  ) : (
                    <div
                      className={
                        currentVehicleStatus === "PENDING"
                          ? "chip yellow"
                          : currentVehicleStatus === "APPROVED"
                          ? "chip green"
                          : "chip red"
                      }
                    >
                      <div className="circle"></div>
                      <div>
                        {
                          currentVehicleStatus
                        }
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </table>
      </Paper>
      <AddVehicleDialog
        isOpen={isAddDialogOpen}
        handleClose={(val) => handleAddDialogClose(val)}
        userId={state[0].id}
      />
      <AddPolicyDialog
        isOpen={isPolicyDialogOpen}
        handleClose={(val) => addPolicyClose(val)}
        vehicleId={selectedVehicleId}
      />
      <AddClaimDialog
        isOpen={isClaimsDialogOpen}
        handleClose={(val) => addClaimClose(val)}
        vehicleId={selectedVehicleId}
        userId={state[0].id}
      />
    </div>
  );
}

export default HomePage;
