const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    total: { type: String, required: true },
    image: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    status: { type: String, required: true },
    userEmail: { type: String, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);