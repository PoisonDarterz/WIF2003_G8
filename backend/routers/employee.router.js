const express = require('express');
const router = express.Router();
const multer = require("multer");
const { BlobServiceClient } = require("@azure/storage-blob");
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 }  // Set file size limit to 1MB (adjust as needed)
});


const Employee = require('../models/employee.model');
const User = require('../models/user.model');
const Department = require('../models/department.model');
const Role = require('../models/role.model');

require("dotenv").config();

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient("profilepic");

router.post('/:id/profile-pic', upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    let fileUrl;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const blobName = Date.now() + "-" + file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });
    fileUrl = blockBlobClient.url;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      { $set: { profilePicURL: fileUrl } }, // Update the profilePicURL
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: err.message });
  }
});

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

      res.json(employee); 
      console.log(`Fetched employee with ID: ${employeeId}`);
    } catch (err) {
      console.error("Error fetching employee:", err);
      res.status(500).json({ message: err.message });
    }
  });

// Update employee profile
router.put('/:id', async (req, res) => {
  try {
    const { edu, skills, awards, profilePicURL, ...employeeData } = req.body; // Ensure profilePicURL is retrieved

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      { $set: { edu, skills, awards, profilePicURL }, ...employeeData }, // Update profilePicURL
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