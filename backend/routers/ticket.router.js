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
      const newTicket = new Ticket({
        ticketID: req.body.ticketID,
        employeeID: req.user.employeeID,
        dateTimeCreated: req.body.dateTimeCreated,
        category: req.body.category,
        subject: req.body.subject,
        detail: req.body.detail,
        attachment: req.body.attachment,
        investigatorID: req.body.investigatorID,
        investigationUpdate: req.body.investigationUpdate,
        status: req.body.status,
      });
      await newTicket
        .save()
        .then(() => console.log("Ticket submitted successfully to mongodb"))
        .catch((error) =>
          console.error("Error create new ticket at mongodb: ", error)
        );
    } catch (error) {
      console.error("Error submitting ticket: ", error);
    }
  }
);

module.exports = router;
