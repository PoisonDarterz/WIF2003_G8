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
            console.log(`Generating PDF for employee ${employee.id}`);
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
            const blobName = `${employee.id}-${new Date().toISOString()}.pdf`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(pdfBuffer, pdfBuffer.length); 

            console.log('PDF uploaded to Azure Blob Storage');

            // Get the URL of the uploaded PDF
            const documentURL = blockBlobClient.url;

            // Create a new Salary document
            const salary = new Salary({
                dateIssued: new Date(),
                // rest of your code
            });

            console.log('Salary document created');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

module.exports = router;