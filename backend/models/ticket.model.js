const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketID: {
    type: String,
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
  },
  dateTimeCreated: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    default: "General",
  },
  subject: {
    type: String,
  },
  detail: {
    type: String,
  },
  attachment: {
    type: String,
  },
  investigatorID: {
    type: String,
  },
  investigationUpdate: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
