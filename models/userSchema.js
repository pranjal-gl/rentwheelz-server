const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rent-wheelz', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected');
  } catch (err) {
    console.log('Error:', err);
  }
};

connectDB();

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: false },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true, unique: false },
    userLicense: { type: String, required: true, unique: true },
});
module.exports = mongoose.model('User', UserSchema);