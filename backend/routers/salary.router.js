const express = require("express");
const router = express.Router();

const { BlobServiceClient } = require("@azure/storage-blob");
const pdfMake = require("pdfmake/build/pdfmake");
const Salary = require("../models/salary.model"); //
const generatePreview = require("../utils/generatePreview");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

// Azure Blob Storage setup
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient("salaryslips");

router.post(
  "/generate-salary",
  authenticateUser,
  async (req, res) => {
    try {
      console.log("Received request to generate salary");
      const checkedEmployees = req.body;
      console.log(`Processing ${checkedEmployees.length} employees`);

      // Loop through all checked employees
      for (const employee of checkedEmployees) {
        console.log(`Generating PDF for employee ${employee.employee.id}`);

        // Generate the PDF
        const pdfDocDefinition = generatePreview(
          employee.employee,
          employee.salaryDetails,
          true
        );
        const pdfDocGenerator = pdfMake.createPdf(pdfDocDefinition);

        // Convert the PDF to a Buffer
        const pdfBuffer = await new Promise((resolve, reject) => {
          pdfDocGenerator.getBuffer(resolve);
        });

        console.log("PDF converted to buffer");

        // Upload the PDF to Azure Blob Storage
        const blobName = `${
          employee.employee.id
        }-${new Date().toISOString()}.pdf`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(pdfBuffer, pdfBuffer.length);

        console.log("PDF uploaded to Azure Blob Storage");

        // Get the URL of the uploaded PDF
        const documentURL = blockBlobClient.url;
        console.log("Salary document created");

        const salaryDetails2 = Object.keys(employee.salaryDetails)
          .map((category) => {
            if (category !== "monthYear") {
              return {
                category,
                records: employee.salaryDetails[category],
              };
            }
          })
          .filter(Boolean);

        const [year, month] = employee.salaryDetails.monthYear.split("-");
        const employeeNumber = String(employee.employee.id).padStart(3, "0");
        const salaryId = `${employeeNumber}${year.slice(-2)}${month}`;

        // Create a new Salary document
        const salary = new Salary({
          slipId: salaryId,
          dateIssued: new Date(),
          month: employee.salaryDetails.monthYear,
          documentURL,
          employeeId: employee.employee.id,
          salaryDetails: salaryDetails2,
        });

        salary
          .save()
          .then(() => console.log("Salary added successfully"))
          .catch((err) => console.error("Error: ", err));

        console.log("Salary document saved to MongoDB");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
);

router.get("/getAll", async (req, res) => {
  try {
    const salarySlips = await Salary.find();
    res.json(salarySlips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get(
  "/my-salary",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
    try {
      const salarySlips = await Salary.find({
        employeeId: req.user.employeeID,
      });

      if (salarySlips.length === 0) {
        return res
          .status(404)
          .json({ message: "No salary slips found for the logged-in user" });
      }

      res.json(salarySlips); // Send the salary slips in the response
    } catch (err) {
      console.error("Error fetching salary slips:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
