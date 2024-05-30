// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const LeaveApplication = require("./models/leave.model");

// Dummy data
const dummyData = [
  {
    employeeName: "John Doe",
    employeeID: "EMP001",
    department: "HR",
    leaveType: "Sick",
    startDate: new Date("2023-10-31"),
    endDate: new Date("2023-11-01"),
    status: "Accepted",
  },
  {
    employeeName: "Jane Smith",
    employeeID: "EMP002",
    department: "Finance",
    leaveType: "Vacation",
    startDate: new Date("2023-10-28"),
    endDate: new Date("2023-10-30"),
    status: "Pending",
  },
  {
    employeeName: "Alice Johnson",
    employeeID: "EMP003",
    department: "IT",
    leaveType: "Personal",
    startDate: new Date("2023-11-05"),
    endDate: new Date("2023-11-05"),
    status: "Accepted",
  },
  {
    employeeName: "Bob Brown",
    employeeID: "EMP004",
    department: "Marketing",
    leaveType: "Sick",
    startDate: new Date("2023-11-10"),
    endDate: new Date("2023-11-11"),
    status: "Pending",
  },
  {
    employeeName: "Charlie Davis",
    employeeID: "EMP005",
    department: "Sales",
    leaveType: "Medical Appointment",
    startDate: new Date("2023-11-15"),
    endDate: new Date("2023-11-15"),
    status: "Accepted",
  },
  {
    employeeName: "Diana Evans",
    employeeID: "EMP006",
    department: "HR",
    leaveType: "Vacation",
    startDate: new Date("2023-11-20"),
    endDate: new Date("2023-11-25"),
    status: "Pending",
  },
  {
    employeeName: "Ethan Foster",
    employeeID: "EMP007",
    department: "Finance",
    leaveType: "Personal",
    startDate: new Date("2023-11-30"),
    endDate: new Date("2023-12-01"),
    status: "Accepted",
  },
  {
    employeeName: "Fiona Green",
    employeeID: "EMP008",
    department: "IT",
    leaveType: "Sick",
    startDate: new Date("2023-12-05"),
    endDate: new Date("2023-12-06"),
    status: "Pending",
  },
  {
    employeeName: "George Harris",
    employeeID: "EMP009",
    department: "Marketing",
    leaveType: "Medical Appointment",
    startDate: new Date("2023-12-10"),
    endDate: new Date("2023-12-10"),
    status: "Accepted",
  },
  {
    employeeName: "Hannah Irving",
    employeeID: "EMP010",
    department: "Sales",
    leaveType: "Vacation",
    startDate: new Date("2023-12-15"),
    endDate: new Date("2023-12-20"),
    status: "Pending",
  },
];

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://empadmin:" +
    process.env.MONGODB_PASSWORD +
    "@employeeconnectsuite.1flw4yf.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Connected to the database!");

  try {
    // Clear existing data
    await LeaveApplication.deleteMany({});
    console.log("Existing data cleared.");

    // Insert dummy data
    await LeaveApplication.insertMany(dummyData);
    console.log("Dummy data inserted.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  }
});
