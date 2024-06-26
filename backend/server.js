require("dotenv").config({ path: "../.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const salaryRouter = require("./routers/salary.router");
const employeeRouter = require("./routers/employee.router");
const authRouter = require("./routers/auth.router");
const benefitRouter = require("./routers/benefit.router");
const communityRouter = require("./routers/community.router");
const attendanceRouter = require("./routers/attendance.router");
const leaveRouter = require("./routers/leave.router");
const roleRouter = require("./routers/role.router");
const ticketRouter = require("./routers/ticket.router");
const feedbackRouter = require("./routers/feedback.router");

// Connect to MongoDB Atlas database
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
db.once("open", function () {
  console.log("We're connected to the database!");
});

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow sending cookies from the frontend
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/benefits", benefitRouter);
app.use("/api/community", communityRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/roles", roleRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/feedbacks", feedbackRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
