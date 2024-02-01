const mongoose = require('mongoose');

// Assuming you're already connected to the 'rent-wheelz' database

const CarSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  hourlyRent: { type: String, required: true },
  image: { type: String, required: true },
});
module.exports = mongoose.model('Car', CarSchema);