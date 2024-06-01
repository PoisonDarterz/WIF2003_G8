const express = require("express");
const router = express.Router();

const Ticket = require("../models/ticket.model");

router.get("/myTickets", async (req, res) => {
  try {
    const myTickets = await Ticket.find({
      employeeID: req.user.employeeID,
    });
    res.json(myTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find();
    res.json(allTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
});

module.exports = router;
