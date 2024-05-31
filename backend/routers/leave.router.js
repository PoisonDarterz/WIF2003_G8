const express = require("express");
const router = express.Router();
const multer = require("multer");
const { BlobServiceClient } = require("@azure/storage-blob");
const LeaveApplication = require("../models/leave.model");
const { authenticateUser } = require("../middlewares/auth.middleware");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Azure Blob Storage setup
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.JAMES_CONNECTION_STRING
);
const containerClient =
  blobServiceClient.getContainerClient("leaveapplication");

router.post(
  "/apply",
  authenticateUser,
  upload.single("file"),
  async (req, res) => {
    try {
      const {
        employeeName,
        employeeID,
        department,
        leaveType,
        startDate,
        endDate,
      } = req.body;
      const file = req.file;

      const currentDate = new Date();
      const monthIssued = currentDate.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
      });

      let fileUrl = null;
      if (file) {
        const blobName = Date.now() + "-" + file.originalname;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(file.buffer, {
          blobHTTPHeaders: {
            blobContentType: file.mimetype,
          },
        });
        fileUrl = blockBlobClient.url;
      }

      const leaveApplication = new LeaveApplication({
        employeeName,
        employeeID,
        department,
        leaveType,
        startDate,
        endDate,
        file: fileUrl,
        monthIssued,
        userId: req.user._id,
      });

      await leaveApplication.save();
      res
        .status(201)
        .json({ message: "Leave application submitted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/applications", authenticateUser, async (req, res) => {
  try {
    const applications = await LeaveApplication.find({ userId: req.user._id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
