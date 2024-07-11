// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/car-rental-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Vehicle model
const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  transmission: String,
  fuelType: String,
  dailyRentalRate: Number
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Define the Booking model
const bookingSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  startDate: Date,
  endDate: Date,
  customerName: String,
  customerEmail: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// Create API routes
app.use(bodyParser.json());

app.get('/api/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find().exec();
  res.json(vehicles);
});

app.get('/api/vehicles/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id).exec();
  res.json(vehicle);
});

app.post('/api/bookings', async (req, res) => {
  const { vehicleId, startDate, endDate, customerName, customerEmail } = req.body;
  const vehicle = await Vehicle.findById(vehicleId).exec();
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  const booking = new Booking({
    vehicle,
    startDate,
    endDate,
    customerName,
    customerEmail
  });
  await booking.save();
  res.json(booking);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});