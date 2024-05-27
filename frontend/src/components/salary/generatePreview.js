import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePreview(employee, salaryDetails) {
  const grossPay = salaryDetails.basic + salaryDetails.allowances.reduce((a, b) => a + b.amount, 0) + salaryDetails.bonuses.reduce((a, b) => a + b.amount, 0);
  const totalDeductions = salaryDetails.deductions.reduce((a, b) => a + b.amount, 0) + salaryDetails["EPF \/ Socso"].reduce((a, b) => a + b.amount, 0);
  const netPay = grossPay - totalDeductions;

  const documentDefinition = {
    content: [
      { text: 'Company Name', style: 'header' },
      `Payment for ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`,
      `Employee Name: ${employee.name}`,
      `Employee Number: ${employee.number}`,
      `Employee Role: ${employee.role}`,
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
            ['Earnings', 'Deductions'],
            [`Basic Pay: ${salaryDetails.basic}`, ''],
            ...salaryDetails.allowances.map(allowance => [`${allowance.name}: ${allowance.amount}`, '']),
            ...salaryDetails.bonuses.map(bonus => [`${bonus.name}: ${bonus.amount}`, '']),
            ['', ...salaryDetails.deductions.map(deduction => `${deduction.name}: ${deduction.amount}`)],
            [`Gross Pay: ${grossPay}`, `Total Deductions: ${totalDeductions}`],
          ]
        }
      },
      `Employer EPF: ${salaryDetails["EPF \/ Socso"].find(item => item.name === 'EPF').amount}`,
      `Employer SOCSO: ${salaryDetails["EPF \/ Socso"].find(item => item.name === 'SOCSO').amount}`,
      `Net Pay: ${netPay}`,
      { text: 'Approved By: ________    Received By: ________', style: 'footer' },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      footer: {
        fontSize: 12,
        alignment: 'center',
        margin: [0, 50, 0, 0]
      }
    }
  };

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  
  return new Promise((resolve, reject) => {
    pdfDocGenerator.getDataUrl(resolve);
  });
}