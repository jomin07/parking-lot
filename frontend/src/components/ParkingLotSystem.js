import React from "react";
import CreateParking from "./CreateParking";
import ParkCar from "./ParkCar";
import LeaveSlot from "./LeaveSlot";
import ParkingStatus from "./ParkingStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaParking } from "react-icons/fa";

const ParkingLotSystem = () => {
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg rounded-lg p-8 ">
      <h1 className="text-2xl font-bold text-center text-white mb-6 flex items-center justify-center">
        <FaParking className="mr-2 text-4xl" />
        Parking Lot System
      </h1>

      <CreateParking notifySuccess={notifySuccess} notifyError={notifyError} />
      <ParkCar notifySuccess={notifySuccess} notifyError={notifyError} />
      <LeaveSlot notifySuccess={notifySuccess} notifyError={notifyError} />
      <ParkingStatus notifyError={notifyError} />

      <ToastContainer />
    </div>
  );
};

export default ParkingLotSystem;
