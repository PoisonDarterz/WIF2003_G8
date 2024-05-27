const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        console.log("Fetched employees:", employees); 
        res.json(employees);
    } catch (err) {
        console.log("Error fetching employees:", err); 
        res.status(500).json({ message: err.message });
    }
});

// Get employee by custom ID
router.get('/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;  
      const employee = await Employee.findOne({ id: employeeId }); 
      console.log(`Fetched employee with ID: ${employeeId}`);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json(employee); 
    } catch (err) {
      console.error("Error fetching employee:", err);
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
