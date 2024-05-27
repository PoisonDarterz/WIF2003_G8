const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  name: {type: String},
  department: {type: String},
  jobTitle: {type: String},
  email: {type: String}
});

module.exports = mongoose.model('Employee', employeeSchema);
