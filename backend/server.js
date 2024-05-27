require('dotenv').config({ path: '../.env' }); // Add this line at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const employeeRouter = require('./routers/employee.router');
const authRouter = require('./routers/auth.router')

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

app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
