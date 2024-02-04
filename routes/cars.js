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

module.exports = router;
