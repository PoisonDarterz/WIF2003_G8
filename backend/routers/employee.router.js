const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');
const User = require('../models/user.model');
const Department = require('../models/department.model');
const Role = require('../models/role.model')

// Get all employees
router.get('/', async (req, res) => {
  try {
      const employees = await Employee.find().populate([
        {
          path: 'email',
          model: 'User' 
        },
        {
          path: 'roleId',
          model: 'Role', 
          populate: {
            path: 'departmentId',
            model: 'Department'
          }
        }
      ]); 

      const employeesData = employees.map(employee => {
        const emailContact = employee.emailContact || employee.email.email;
        return {
          ...employee.toObject(),
          emailContact: emailContact
        };
      });
  
      res.json(employeesData);
  } catch (err) {
      console.log("Error fetching employees:", err); 
      res.status(500).json({ message: err.message });
  }
});

// Get employee by custom ID
router.get('/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;  
      const employee = await Employee.findOne({id: employeeId}).populate([
        {
          path: 'email',
          model: 'User'
        },
        {
          path: 'roleId',
          model: 'Role', 
          populate: {
            path: 'departmentId',
            model: 'Department'
          }
        },
        { path: 'edu' },
        { path: 'skills' },
        { path: 'awards' }
      ]); 
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      const emailContact = employee.emailContact || employee.email.email;

      const employeeData = {
        ...employee.toObject(),
        emailContact: emailContact
      };

      res.json(employeeData); 
      console.log(`Fetched employee with ID: ${employeeId}`);
    } catch (err) {
      console.error("Error fetching employee:", err);
      res.status(500).json({ message: err.message });
    }
  });

// Update employee profile
router.put('/:id', async (req, res) => {
  try {
    const { edu, skills, awards, ...employeeData } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      { $set: { edu, skills, awards }, ...employeeData },
      { new: true }
    ).populate([
      {
        path: 'email',
        model: 'User'
      },
      {
        path: 'roleId',
        model: 'Role',
        populate: {
          path: 'departmentId',
          model: 'Department'
        }
      },
      { path: 'edu' },
      { path: 'skills' },
      { path: 'awards' }
    ]);

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;