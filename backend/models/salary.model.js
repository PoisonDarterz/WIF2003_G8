const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
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

const SalaryDetailSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  records: [RecordSchema]
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
    ref: 'Employee',
    required: true
  },
  salaryDetails: [SalaryDetailSchema]
});

module.exports = mongoose.model('Salary', SalarySchema);