const express = require('express');
const router = express.Router();
const Role = require('../models/role.model');
const Department = require('../models/department.model');

// Route to get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all departments
router.get('/departments/:departmentId', async (req, res) => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);
    res.json(department);
  } catch (err) {
    console.error("Error fetching department:", err);
    res.status(500).json({ message: err.message });
  }
});


 
  module.exports = router;