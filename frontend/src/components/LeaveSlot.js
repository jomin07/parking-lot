import { useState } from "react";
import axios from "axios";

const LeaveSlot = ({ notifySuccess, notifyError }) => {
  const [slotNumber, setSlotNumber] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const leaveSlot = async () => {
    setError("");
    if (!slotNumber || slotNumber <= 0) {
      setError("Slot number must be a positive number.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/parking/leave`, {
        slotNumber,
      });
      notifySuccess("Slot vacated successfully");
      setSlotNumber("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to vacate the slot";
      notifyError(errorMessage);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Vacate Slot</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter Slot Number"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={leaveSlot}
          >
            Vacate
          </button>
        </div>

        {error && (
          <div className="text-red-700 text-sm bg-red-200 p-2 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveSlot;
