var express = require('express');
var router = express.Router();
var BookingSchema = require('../models/bookingSchema');


router.post('/reserve', async (req, res) => {
    try {
        const { carName, total, image, fromDate, toDate, status, userEmail } = req.body;

        // Create a new booking
        const booking = new BookingSchema({ carName, total, image, fromDate, toDate, status, userEmail });

        // Save the booking to the database
        await booking.save();

        res.status(201).json({status: "success", booking: booking});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/my-bookings', async (req, res) => {
    try {
        const bookings = await BookingSchema.find({});
        bookings.sort((a, b)=>{
            return b._id.getTimestamp() - a._id.getTimestamp()
        })
        res.status(200).json({message: 'success', bookings: bookings});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/cancel/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;

        // Find the booking by id and update its status
        const booking = await BookingSchema.findByIdAndUpdate(
            bookingId,
            { status: 'Cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
