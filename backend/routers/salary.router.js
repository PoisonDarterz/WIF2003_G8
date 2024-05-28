const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { BlobServiceClient } = require('@azure/storage-blob');
const pdfMake = require('pdfmake/build/pdfmake');
const Salary = require('../models/salary.model');  // 
const generatePreview = require('../utils/generatePreview');

// Azure Blob Storage setup
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('salaryslips');

router.post('/generate-salary', async (req, res) => {
    try {
        console.log('Received request to generate salary');
        const checkedEmployees = req.body;
        console.log(`Processing ${checkedEmployees.length} employees`);

        // Loop through all checked employees
        for (const employee of checkedEmployees) {
            console.log(`Generating PDF for employee ${employee.employee.id}`);
            console.log(employee);

            // Generate the PDF
            const pdfDocDefinition = generatePreview(employee.employee, employee.salaryDetails, true);
            const pdfDocGenerator = pdfMake.createPdf(pdfDocDefinition);

            // Convert the PDF to a Buffer
            const pdfBuffer = await new Promise((resolve, reject) => {
                pdfDocGenerator.getBuffer(resolve);
            });

            console.log('PDF converted to buffer');

            // Upload the PDF to Azure Blob Storage
            const blobName = `${employee.employee.id}-${new Date().toISOString()}.pdf`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(pdfBuffer, pdfBuffer.length);

            console.log('PDF uploaded to Azure Blob Storage');

            // Get the URL of the uploaded PDF
            const documentURL = blockBlobClient.url;
            console.log('Salary document created');

            const salaryDetails2 = Object.keys(employee.salaryDetails).map(category => {
                if (category !== 'monthYear') {
                    return {
                        category,
                        records: employee.salaryDetails[category]
                    };
                }
            }).filter(Boolean);

            console.log('Salary details:', salaryDetails2);

            // Create a new Salary document
            const salary = new Salary({
                dateIssued: new Date(),
                month: employee.salaryDetails.monthYear,
                documentURL,
                employeeId: employee.employee._id,
                salaryDetails: salaryDetails2
            });

            salary.save()
                .then(() => console.log('Salary added successfully'))
                .catch(err => console.error('Error: ', err));

            console.log('Salary document saved to MongoDB');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

module.exports = router;