const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema({
  benefit: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
});

const TypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  benefits: [BenefitSchema]
});

const RoleSchema = new mongoose.Schema({
  roleId: {
    type: String,
    required: true,
    unique: true
  },
  roleName: {
    type: String,
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  benefits: [TypeSchema]
});

module.exports = mongoose.model('Role', RoleSchema);