const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  dateIssued: {
    type: Date,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  documentURL: {
    type: String,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // assuming 'Employee' is the model name for your employee collection
    required: true
  }
});

module.exports = mongoose.model('Salary', SalarySchema);