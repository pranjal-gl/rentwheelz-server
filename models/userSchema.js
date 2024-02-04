const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: false },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true, unique: false },
    userLicense: { type: String, required: true, unique: true },
});
module.exports = mongoose.model('User', UserSchema);