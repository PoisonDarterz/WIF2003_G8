const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema({
  benefitId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  benefit: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }
});

module.exports = mongoose.model('Benefit', BenefitSchema);