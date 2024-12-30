import { FaCar, FaRegCircle } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const ParkingStatus = ({ notifyError }) => {
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");
  const [color, setColor] = useState("");
  const [registrationNumbers, setRegistrationNumbers] = useState([]);
  const [slotNumbers, setSlotNumbers] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchStatus = async () => {
    setError("");
    setRegistrationNumbers([]);
    setSlotNumbers([]);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/parking/status`);
      setStatus(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch parking lot status";
      notifyError(errorMessage);
    }
  };

  const fetchRegistrationNumbersByColor = async () => {
    if (!color.trim()) {
      const errorMessage = "Color field cannot be empty";
      setError(errorMessage);
      return;
    }

    if (/^\d+$/.test(color)) {
      const errorMessage = "Color cannot be a number";
      setError(errorMessage);
      return;
    }

    setRegistrationNumbers([]);
    setStatus([]);
    setSlotNumbers([]);
    setError("");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/parking/registration_numbers_by_color/${color}`
      );
      setRegistrationNumbers(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch registration numbers";
      notifyError(errorMessage);
    }
  };

  const fetchSlotNumbersByColor = async () => {
    if (!color.trim()) {
      const errorMessage = "Color field cannot be empty";
      setError(errorMessage);
      return;
    }

    if (/^\d+$/.test(color)) {
      const errorMessage = "Color cannot be a number";
      setError(errorMessage);
      return;
    }

    setSlotNumbers([]);
    setStatus([]);
    setRegistrationNumbers([]);
    setError("");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/parking/slot_numbers_by_color/${color}`
      );
      setSlotNumbers(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch slot numbers";
      notifyError(errorMessage);
    }
  };

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-gray-300 to-blue-200 rounded-lg shadow-lg text-gray-800">
      <div className="flex flex-col space-y-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out flex items-center justify-center space-x-2"
          onClick={fetchStatus}
        >
          <FaCar className="text-white text-xl" />
          <span>Fetch Status</span>
        </button>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            className="p-2 rounded-lg border border-gray-300"
            placeholder="Enter car color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            onClick={fetchRegistrationNumbersByColor}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search Registration Numbers by Color
          </button>
          <button
            onClick={fetchSlotNumbersByColor}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search Slot Numbers by Color
          </button>
        </div>

        {error && (
          <div className="text-red-700 text-sm bg-red-200 p-3 rounded-lg">
            {error}
          </div>
        )}

        {registrationNumbers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">
              Registration Numbers of Cars with Color: {color}
            </h3>
            <ul>
              {registrationNumbers.map((regNo, index) => (
                <li key={index}>{regNo}</li>
              ))}
            </ul>
          </div>
        )}

        {slotNumbers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">
              Slot Numbers for Cars with Color: {color}
            </h3>
            <ul>
              {slotNumbers.map((slotNo, index) => (
                <li key={index}>{slotNo}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md space-y-4">
          {status.length > 0 ? (
            <ul className="space-y-3">
              {status.map((slot, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaRegCircle className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      Slot {slot.slotNumber}:{" "}
                      {slot.carNumber && slot.carColor ? (
                        <span>
                          {slot.carNumber} ({slot.carColor})
                        </span>
                      ) : (
                        <span className="text-green-500">Empty</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No status available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingStatus;
