import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePreview(employee, salaryDetails, returnDefinition = false) {
  const grossPay = salaryDetails.basic[0].amount + salaryDetails.allowances.reduce((a, b) => a + b.amount, 0) + salaryDetails.bonuses.reduce((a, b) => a + b.amount, 0);
  const totalDeductions = salaryDetails.deductions.reduce((a, b) => a + b.amount, 0) + salaryDetails["EPF \/ Socso"].reduce((a, b) => a + b.amount, 0);
  const netPay = grossPay - totalDeductions;

  const earnings = [
    `Basic Pay: ${salaryDetails.basic[0].amount}`,
    ...salaryDetails.allowances.map(allowance => `${allowance.name}: ${allowance.amount}`),
    ...salaryDetails.bonuses.map(bonus => `${bonus.name}: ${bonus.amount}`),
  ];

  const deductions = [
    ...salaryDetails.deductions.map(deduction => `${deduction.name}: ${deduction.amount}`),
    `Employee EPF: ${salaryDetails["EPF \/ Socso"].find(item => item.name === 'EPF').amount}`,
    `Employee SOCSO: ${salaryDetails["EPF \/ Socso"].find(item => item.name === 'SOCSO').amount}`,
  ];

  // Ensure both arrays have the same length
  while (earnings.length < deductions.length) {
    earnings.push('');
  }
  while (deductions.length < earnings.length) {
    deductions.push('');
  }

  // Add Gross Pay and Total Deductions at the end
  earnings.push('');  // Add an empty row
  deductions.push('');  // Add an empty row
  earnings.push(`Gross Pay: ${grossPay}`);
  deductions.push(`Total Deductions: ${totalDeductions}`);

  const rows = earnings.map((earning, index) => [earning, deductions[index] || '']);

  const documentDefinition = {
    content: [
      { text: 'Company Name', style: 'header' },
      `Payment for: ${salaryDetails.monthYear}`,
      `Date Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
      `Employee Name: ${employee.name}`,
      `Employee Number: ${employee.id}`,
      `Employee Role: ${employee.roleId.roleName}`,
      { text: '', margin: [0, 10, 0, 0] },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
            [{ text: 'Earnings', bold: true }, { text: 'Deductions', bold: true }],
            ...rows
          ]
        }
      },
      `Employer EPF: `,
      `Employer SOCSO: `,
      { text: `Net Pay: ${netPay}`, bold: true },
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

  if (returnDefinition) {
    return documentDefinition;
  }

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

  return new Promise((resolve, reject) => {
    pdfDocGenerator.getDataUrl(resolve);
  });
}