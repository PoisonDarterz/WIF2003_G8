const express = require("express");
const router = express.Router();

const Ticket = require("../models/ticket.model");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

router.get(
  "/myTickets",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
    try {
      const myTickets = await Ticket.find({
        employeeID: req.user.employeeID,
      });
      res.json(myTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find();
    res.json(allTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
});

router.post(
  "/submitTicket",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
    try {
      const newTicketID = await generateID();
      const newTicket = new Ticket({
        ticketID: newTicketID,
        employeeID: req.user.employeeID,
        dateTimeCreated: req.body.dateTimeCreated,
        category: req.body.category === "" ? "General" : req.body.category,
        subject: req.body.subject === "" ? "General" : req.body.subject,
        detail: req.body.detail,
        attachment: req.body.attachment,
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

router.put(
  "/:ticketID",
  authenticateUser,
  // checkRole("Admin"),
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
