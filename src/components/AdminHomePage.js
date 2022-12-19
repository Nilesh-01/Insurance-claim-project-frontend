import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Fragment, useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import Paper from "@mui/material/Paper";
import ViewDetailsDialog from "./ViewDetailsDialog";

function AdminHomePage() {
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  const [claimsData, setClaimsData] = useState([]);
  const [selectedClaimsVehicleId, setSelectedClaimsVehicleId] = useState(-1);
  const [selectedClaimsUserId, setSelectedClaimsUserId] = useState(-1);
  const navigate = useNavigate();
  const { state } = useLocation();

  const viewDetailsClose = () => {
    setIsViewDetailsDialogOpen(false);
  };

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    } else {
      getAllClaims();
    }
  }, [state]);

  const getAllClaims = () => {
    const url = "https://localhost:5001/api/claims/get-all-claims";
    axios
      .get(url)
      .then((result) => {
        setClaimsData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleViewDetails = (vehicleId, userId) => {
    setSelectedClaimsVehicleId(vehicleId);
    setSelectedClaimsUserId(userId);
    setIsViewDetailsDialogOpen(true);
  };

  //Status change handle -> Approve && Decline
  const handleStatusChange = (id, status) => {
    const data = {
      id: id,
      status: status,
    };
    const url = "https://localhost:5001/api/claims/update-claim";
    axios
      .put(url, null, { params: data })
      .then((result) => {
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
        </div>
        <div className="navbar-right">
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
        <div className="title">Claims Details</div>
        <table>
          <tr>
            <th>Serial No.</th>
            <th>License No.</th>
            <th>Date of Accident</th>
            <th>Driver's Name</th>
            <th>Details</th>
            <th>Status</th>
            <th></th>
          </tr>
          {claimsData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.licenseNo}</td>
              <td>
                {new Date(item.dateOfAccident).getDate() +
                  "-" +
                  parseInt(new Date(item.dateOfAccident).getMonth() + 1) +
                  "-" +
                  new Date(item.dateOfAccident).getFullYear()}
              </td>
              <td>{item.driverName}</td>
              <td>
                <Button
                  className="btn"
                  variant="contained"
                  onClick={() => handleViewDetails(item.vehicleId, item.userId)}
                >
                  View Details
                </Button>
              </td>
              <td>
                {item.status === "PENDING" ? (
                  <div className="admin-actions">
                    <Button
                      className="btn"
                      variant="contained"
                      color="success"
                      onClick={() => handleStatusChange(item.id, "APPROVED")}
                    >
                      APPROVE
                    </Button>
                    <Button
                      className="btn"
                      variant="contained"
                      color="error"
                      onClick={() => handleStatusChange(item.id, "DECLINED")}
                    >
                      DECLINE
                    </Button>
                  </div>
                ) : (
                  <div
                      className={
                        item.status === "PENDING"
                          ? "chip yellow"
                          : item.status === "APPROVED"
                          ? "chip green"
                          : "chip red"
                      }
                    >
                      <div className="circle"></div>
                      <div>
                        {
                          item.status
                        }
                      </div>
                    </div>
                )}
              </td>
            </tr>
          ))}
        </table>
      </Paper>
      <ViewDetailsDialog
        isOpen={isViewDetailsDialogOpen}
        handleClose={viewDetailsClose}
        vehicleId={selectedClaimsVehicleId}
        userId={selectedClaimsUserId}
      />
    </div>
  );
}

export default AdminHomePage;
