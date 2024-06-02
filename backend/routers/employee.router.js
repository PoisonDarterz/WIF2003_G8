const express = require('express');
const router = express.Router();
const multer = require("multer");
const { BlobServiceClient } = require("@azure/storage-blob");
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 }  // Set file size limit to 1MB
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
const containerClientEdu = blobServiceClient.getContainerClient("edu");
const containerClientSkills = blobServiceClient.getContainerClient("skills");
const containerClientAwards = blobServiceClient.getContainerClient("awards");

router.post('/:id/upload', upload.fields([
  { name: 'profilePic', maxCount: 1 }, 
  { name: 'eduDoc', maxCount: 1 }, 
  { name: 'skillsDoc', maxCount: 1 },
  { name: 'awardsDoc', maxCount: 1 }, 
]), async (req, res) => {
  try {
    const { profilePic, eduDoc, skillsDoc, awardsDoc } = req.files;

    let profilePicURL;
    if (profilePic && profilePic.length > 0) {
      const profilePicBlobName = Date.now() + "-" + profilePic[0].originalname;
      const profilePicBlockBlobClient = containerClient.getBlockBlobClient(profilePicBlobName);
      await profilePicBlockBlobClient.uploadData(profilePic[0].buffer, {
        blobHTTPHeaders: {
          blobContentType: profilePic[0].mimetype,
        },
      });
      profilePicURL = profilePicBlockBlobClient.url;
    }

    let eduDocURL;
    if (eduDoc && eduDoc.length > 0) {
      const eduDocBlobName = Date.now() + "-" + eduDoc[0].originalname;
      const eduDocBlockBlobClient = containerClientEdu.getBlockBlobClient(eduDocBlobName);
      await eduDocBlockBlobClient.uploadData(eduDoc[0].buffer, {
        blobHTTPHeaders: {
          blobContentType: eduDoc[0].mimetype,
        },
      });
      eduDocURL = eduDocBlockBlobClient.url;
    }

    let skillsDocURL;
    if (skillsDoc && skillsDoc.length > 0) {
      const skillsDocBlobName = Date.now() + "-" + skillsDoc[0].originalname;
      const skillsDocBlockBlobClient = containerClientSkills.getBlockBlobClient(skillsDocBlobName);
      await skillsDocBlockBlobClient.uploadData(skillsDoc[0].buffer, {
        blobHTTPHeaders: {
          blobContentType: skillsDoc[0].mimetype,
        },
      });
      skillsDocURL = skillsDocBlockBlobClient.url;
    }

    let awardsDocURL;
    if (awardsDoc && awardsDoc.length > 0) {
      const awardsDocBlobName = Date.now() + "-" + awardsDoc[0].originalname;
      const awardsDocBlockBlobClient = containerClientAwards.getBlockBlobClient(awardsDocBlobName);
      await awardsDocBlockBlobClient.uploadData(awardsDoc[0].buffer, {
        blobHTTPHeaders: {
          blobContentType: awardsDoc[0].mimetype,
        },
      });
      awardsDocURL = awardsDocBlockBlobClient.url;
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          profilePicURL,
          eduDocURL,
          skillsDocURL,
          awardsDocURL
        },
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error uploading files:", err);
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