const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  benefit: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }
});

module.exports = mongoose.model('Benefit', BenefitSchema);