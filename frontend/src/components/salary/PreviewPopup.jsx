import React from 'react';

function PreviewPopup({ data, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto relative">
        <button onClick={onClose} className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full p-2">Close</button>
        <div className="text-left px-16">
          <p><strong>Slip ID:</strong> {data.slipId}</p>
          <p><strong>Date Issued:</strong> {new Date(data.dateIssued).toLocaleDateString()}</p>
          <p><strong>Month:</strong> {data.month}</p>
          <p><strong>Document URL:</strong> <a href={data.documentURL} target="_blank" rel="noreferrer">{data.documentURL}</a></p>
          <p><strong>Employee ID:</strong> {data.employeeId}</p>
        </div>
        <div>
          {data.salaryDetails.map((detail, index) => (
            <div key={index}>
                <br></br>
                <h3 style={{ textDecoration: 'underline' }}><strong>{detail.category}</strong></h3>
              <table style={{ width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.records.map((record, i) => (
                    <tr key={i}>
                      <td>{record.name}</td>
                      <td>{record.amount}</td>
                      <td>{record.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreviewPopup;