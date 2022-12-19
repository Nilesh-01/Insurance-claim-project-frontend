import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewDetails.scss";

function ViewDetailsDialog(props) {
  const [vehicleData, setVehicleData] = useState();
  const [userData, setUserData] = useState();

  const getUserByUserId = () => {
    const url = `https://localhost:5001/api/user/get-user-by-id/${props.userId}`;
    axios
      .get(url)
      .then((result) => {
        setUserData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getVehiclesByVehicleId = () => {
    const url = `https://localhost:5001/api/vehicle/get-vehicle-by-vehicleId/${props.vehicleId}`;
    axios
      .get(url)
      .then((result) => {
        setVehicleData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (props.userId !== -1) {
      getVehiclesByVehicleId();
      getUserByUserId();
    }
  }, [props.userId, props.vehicleId]);

  return (
    <Dialog
      className="view-detail-dialog"
      onClose={props.handleClose}
      open={props.isOpen}
    >
      <DialogTitle className="dialog-title">
        User Details
        <img
          src="https://cdn-icons-png.flaticon.com/512/2723/2723639.png"
          onClick={props.handleClose}
        />
      </DialogTitle>
      <div className="detail">
        <div className="text">
          <span>Name:</span> {userData?.name}
        </div>
        <div className="text">
          <span>Address:</span> {userData?.address}
        </div>
        <div className="text">
          <span>Age:</span> {userData?.age}
        </div>
        <div className="text">
          <span>E-mail:</span> {userData?.email}
        </div>
        <div className="text">
          <span>Phone:</span> {userData?.phone}
        </div>
      </div>
      <DialogTitle className="dialog-title">Vehicle Details</DialogTitle>
      <div className="detail">
        <div className="text">
          <span>Vehicle Model:</span> {vehicleData?.vehicleModel}
        </div>
        <div className="text">
          <span>Vehicle No.:</span> {vehicleData?.vehicleNo}
        </div>
        <div className="text">
          <span>Registration No.:</span> {vehicleData?.registrationNo}
        </div>
      </div>
    </Dialog>
  );
}

export default ViewDetailsDialog;
