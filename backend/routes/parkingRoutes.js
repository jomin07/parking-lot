const express = require("express");
const router = express.Router();
const {
  createParkingLot,
  parkCar,
  leaveSlot,
  getParkingLotStatus,
  getRegistrationNumbersByColor,
  getSlotNumbersByColor,
} = require("../controllers/parkingController");

router.post("/create", createParkingLot);
router.post("/park", parkCar);
router.post("/leave", leaveSlot);
router.get("/status", getParkingLotStatus);
router.get(
  "/registration_numbers_by_color/:color",
  getRegistrationNumbersByColor
);
router.get("/slot_numbers_by_color/:color", getSlotNumbersByColor);

module.exports = router;
