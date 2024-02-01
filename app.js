var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var cors = require('cors');
const saltRounds = 10;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userSchema = require('./models/userSchema');
var CarSchema = require('./models/carSchema');
var BookingSchema = require('./models/bookingSchema');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// create a function to generate unique user id
function generateUserId() {
  const userId = Math.floor(Math.random() * 1000000);
  return userId;
}

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

app.get('/getPackages', async (req, res) => {
  try {
    const cars = await CarSchema.find({});
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/reserve', async (req, res) => {
  try {
    const { carName, total, image, fromDate, toDate, status, userEmail } = req.body;

    // Create a new booking
    const booking = new BookingSchema({ carName, total, image, fromDate, toDate, status, userEmail});

    // Save the booking to the database
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/my-bookings', async (req, res) => {
  try {
    const bookings = await BookingSchema.find({});
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/cancel/:id', async (req, res) => {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
