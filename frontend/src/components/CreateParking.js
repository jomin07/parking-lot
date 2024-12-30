import { useState } from "react";
import axios from "axios";

const CreateParking = ({ notifySuccess, notifyError }) => {
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const createParkingLot = async () => {
    setError("");
    if (!capacity || capacity <= 0) {
      setError("Capacity must be a positive number.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/parking/create`, {
        capacity,
      });
      notifySuccess("Parking lot created successfully!");
      setCapacity("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create parking lot";
      notifyError(errorMessage);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Create Parking Lot
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={createParkingLot}
          >
            Create
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

export default CreateParking;
