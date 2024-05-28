const mongoose = require('mongoose');

const IndividualBenefitSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  benefitName: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('IndividualBenefit', IndividualBenefitSchema);