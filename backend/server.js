require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const loginRouter = require('./routers/login.router');

// Connect to MongoDB Atlas database
mongoose.connect('mongodb+srv://empadmin:' + process.env.MONGODB_PASSWORD + '@employeeconnectsuite.1flw4yf.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("We're connected to the database!");
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', loginRouter);
