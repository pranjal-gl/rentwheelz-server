var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var userSchema = require('../models/userSchema');

router.post('/', async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
  
      // Find the user by email
      const user = await userSchema.findOne({ userEmail });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(userPassword, user.userPassword);
  
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // User is authenticated
      res.status(200).json({ message: 'Logged in successfully', email: userEmail });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;