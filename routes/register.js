var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var userSchema = require('../models/userSchema');
var generateUserId = require('../utils/generateUserID');


router.post('/', async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userLicense } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        const user = await userSchema.create({
            userId: generateUserId(),
            userName,
            userEmail,
            userPassword: hashedPassword,
            userLicense
        });
        // save the user in db
        await user.save();
        console.log(user);
        res.status(200).json({ message: 'Registered successfully', email: userEmail });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;