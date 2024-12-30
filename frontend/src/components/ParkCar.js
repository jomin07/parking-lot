import axios from "axios";
import { useState } from "react";

const ParkCar = ({ notifySuccess, notifyError }) => {
  const [carNumber, setCarNumber] = useState("");
  const [carColor, setCarColor] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const parkCar = async () => {
    setError("");
    if (!carNumber || !carColor || !isNaN(carColor)) {
      setError(
        "Car number and color are required, and color must be a string."
      );
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/parking/park`, {
        carNumber,
        carColor,
      });
      notifySuccess("Car parked successfully");
      setCarNumber("");
      setCarColor("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to park the car";
      notifyError(errorMessage);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Park Car</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter Car Number"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter Car Color"
            value={carColor}
            onChange={(e) => setCarColor(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={parkCar}
          >
            Park
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

export default ParkCar;
