const Slot = require("../models/slotModel");

const createParkingLot = async (req, res) => {
  try {
    const { capacity } = req.body;

    if (!capacity || capacity <= 0 || isNaN(capacity)) {
      return res
        .status(400)
        .json({ message: "Capacity must be a positive integer." });
    }

    const existingSlots = await Slot.find();
    if (existingSlots.length > 0) {
      return res.status(409).json({ message: "Parking lot already exists." });
    }

    const slots = [];

    for (let i = 1; i <= capacity; i++) {
      slots.push({ slotNumber: i });
    }

    await Slot.insertMany(slots);
    res
      .status(201)
      .json({ message: `Parking lot created with ${capacity} slots` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const parkCar = async (req, res) => {
  try {
    const { carNumber, carColor } = req.body;
    if (!carNumber || !carColor) {
      return res
        .status(400)
        .json({ message: "Car number and color are required." });
    }

    const normalizedColor = carColor.toLowerCase();

    const existingCar = await Slot.findOne({ carNumber });
    if (existingCar) {
      return res.status(409).json({
        message: `Car with number ${carNumber} is already parked in slot ${existingCar.slotNumber}.`,
      });
    }

    const emptySlot = await Slot.findOne({ carNumber: null }).sort({
      slotNumber: 1,
    });
    if (!emptySlot) {
      return res.status(400).json({ message: "Sorry, parking lot is full" });
    }

    emptySlot.carNumber = carNumber;
    emptySlot.carColor = normalizedColor;
    await emptySlot.save();

    res
      .status(200)
      .json({ message: `Allocated slot number: ${emptySlot.slotNumber}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const leaveSlot = async (req, res) => {
  try {
    const { slotNumber } = req.body;
    if (!slotNumber || slotNumber <= 0 || isNaN(slotNumber)) {
      return res
        .status(400)
        .json({ message: "Slot number must be a positive integer." });
    }

    const slot = await Slot.findOne({ slotNumber });
    if (!slot) {
      return res
        .status(404)
        .json({ message: `Slot number ${slotNumber} does not exist.` });
    }

    if (!slot.carNumber) {
      return res
        .status(400)
        .json({ message: `Slot number ${slotNumber} is already empty.` });
    }

    slot.carNumber = null;
    slot.carColor = null;
    await slot.save();

    res
      .status(200)
      .json({ message: `Slot number ${slotNumber} is now empty.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getParkingLotStatus = async (req, res) => {
  try {
    const slots = await Slot.find();
    if (slots.length === 0) {
      return res
        .status(404)
        .json({ message: "Parking lot has not been created yet." });
    }

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRegistrationNumbersByColor = async (req, res) => {
  try {
    const { color } = req.params;
    const normalizedColor = color.toLowerCase();
    const cars = await Slot.find({ carColor: normalizedColor });

    if (cars.length === 0) {
      return res
        .status(404)
        .json({ message: `No cars found with color ${color}` });
    }

    const carNumbers = cars.map((car) => car.carNumber);
    res.status(200).json(carNumbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSlotNumbersByColor = async (req, res) => {
  try {
    const { color } = req.params;
    const normalizedColor = color.toLowerCase();
    const slots = await Slot.find({ carColor: normalizedColor });

    if (slots.length === 0) {
      return res
        .status(404)
        .json({ message: `No slots found for color ${color}` });
    }

    const slotNumbers = slots.map((slot) => slot.slotNumber);
    res.status(200).json(slotNumbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createParkingLot,
  parkCar,
  leaveSlot,
  getParkingLotStatus,
  getRegistrationNumbersByColor,
  getSlotNumbersByColor,
};
