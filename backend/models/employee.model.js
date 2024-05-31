const mongoose = require('mongoose');

const eduSchema = new mongoose.Schema({
  eduTitle: { type: String },
  eduDesc: { type: String },
  eduDocURL: { type: String },
});

const skillsSchema = new mongoose.Schema({
  skillsTitle: { type: String },
  skillsDesc: { type: String },
  skillsDocURL: { type: String },
});

const awardsSchema = new mongoose.Schema({
  awardsTitle: { type: String },
  awardsDesc: { type: String },
  awardsDocURL: { type: String },
});

const IndividualBenefitSchema = new mongoose.Schema({
  benefitName: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
});

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  profilePicURL: { type: String },
  name: { type: String },
  email: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phone: { type: String },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  joinedSince: { type: Date },
  bio: { type: String },
  edu: [eduSchema],
  skills: [skillsSchema],
  awards: [awardsSchema],
  individualBenefits: [IndividualBenefitSchema],
  emailContact:{ type: String }

});

module.exports = mongoose.model('Employee', employeeSchema);