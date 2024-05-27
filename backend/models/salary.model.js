const mongoose = require('mongoose');

const SalaryDetailSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
});

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
  },
  salaryDetails: [SalaryDetailSchema]
});

module.exports = mongoose.model('Salary', SalarySchema);