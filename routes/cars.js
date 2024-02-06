var express = require('express');
var router = express.Router();
var CarSchema = require('../models/carSchema');

router.get('/', async (req, res) => {
  try {
    const cars = await CarSchema.find({});
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/create-package', async (req, res) => {
  try {
    const { carName, hourlyRent, image } = req.body;

    // Create a new booking
    const package = new CarSchema({ carName, hourlyRent, image });

    // Save the booking to the database
    await package.save();

    res.status(201).json({ status: "success", package: package });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
