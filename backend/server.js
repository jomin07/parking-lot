const express = require("express");
const dotenv = require("dotenv");
const parkingRoutes = require("./routes/parkingRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/api/parking", parkingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Started");
});
