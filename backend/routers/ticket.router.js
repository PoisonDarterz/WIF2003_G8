const express = require("express");
const router = express.Router();
const multer = require("multer");

const { BlobServiceClient } = require("@azure/storage-blob");
// Azure Blob Storage setup
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.CONNECTION_STRING
);
const containerAttachments =
  blobServiceClient.getContainerClient("attachments");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Set file size limit to 10MB
});

const Ticket = require("../models/ticket.model");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

router.get("/myTickets", authenticateUser, async (req, res) => {
  try {
    const myTickets = await Ticket.find({
      employeeID: req.user.employeeID,
    }).sort({ dateTimeCreated: -1 });
    res.json(myTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find().sort({ dateTimeCreated: -1 });
    res.json(allTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
});

router.post(
  "/submitTicket",
  authenticateUser,
  upload.array("attachments", 10),
  async (req, res) => {
    try {
      console.log("req.files:", req.files);
      console.log("req.body:", req.body);

      const fileUrl =
        req.files.length !== 0 ? await uploadToAzureBlob(req.files[0]) : "";
      console.log("fileUrl:", fileUrl);

      const newTicketID = await generateID();
      const newTicket = new Ticket({
        ticketID: newTicketID,
        employeeID: req.user.employeeID,
        dateTimeCreated: req.body.dateTimeCreated,
        category: req.body.category === "" ? "General" : req.body.category,
        subject: req.body.subject === "" ? "General" : req.body.subject,
        detail: req.body.detail,
        attachment: fileUrl,
        investigatorID: "",
        investigationUpdate: "",
        status: "pending",
      });
      const hold = await newTicket.save();
      console.log("Ticket submitted successfully to mongodb");
      res.status(201).json(hold); // Send the created ticket as a response
    } catch (error) {
      console.error("Error submitting ticket to mongodb: ", error);
    }
  }
);

const uploadToAzureBlob = async (file) => {
  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerAttachments.getBlockBlobClient(blobName);

  // await blockBlobClient.upload(file.buffer, file.size);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype,
    },
  });

  return blockBlobClient.url;
};

router.put(
  "/:ticketID",
  authenticateUser,
  checkRole("Admin"),
  async (req, res) => {
    const { ticketID } = req.params;
    const hold = req.body;

    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(ticketID, hold, {
        new: true,
      });
      res.json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket on database:", error);
    }
  }
);

const generateID = async () => {
  const lastTicket = await Ticket.findOne().sort({ ticketID: -1 }).exec();
  let newID = "001";

  if (lastTicket) {
    const lastTicketID = parseInt(lastTicket.ticketID, 10);
    newID = (lastTicketID + 1).toString().padStart(3, "0");
  }

  return newID;
};

module.exports = router;
