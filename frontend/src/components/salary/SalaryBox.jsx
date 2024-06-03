import React, { useState, useEffect } from 'react';
import SalaryDialog from './SalaryDialog';

function SalaryBox({ openModal, setSalaryDetails }) {
  const [localSalaryDetails, setLocalSalaryDetails] = useState({
    monthYear: '',
    basic: [],
    allowances: [],
    bonuses: [],
    deductions: [],
    "EPF \/ Socso": [],
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);

  const handleAddRecord = (title, amount, notes) => {
    const newRecord = { name: title, amount: Number(amount), notes };
    setLocalSalaryDetails(prevState => ({
      ...prevState,
      [category]: [...prevState[category], newRecord],
    }));
  };

  const handleEditRecord = (category, index) => {
    setEditingRecord({ category, index, record: localSalaryDetails[category][index] });
    setModalIsOpen(true);
  };

  const handleSaveEdit = (title, amount, notes) => {
    const updatedRecord = { name: title, amount: Number(amount), notes };
    setLocalSalaryDetails(prevState => ({
      ...prevState,
      [editingRecord.category]: prevState[editingRecord.category].map((record, index) =>
        index === editingRecord.index ? updatedRecord : record
      ),
    }));
    setEditingRecord(null);
    setModalIsOpen(false);
  };

  const handleRemoveRecord = (category, index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      setLocalSalaryDetails(prevState => ({
        ...prevState,
        [category]: prevState[category].filter((_, i) => i !== index),
      }));
    }
  };

  const openModalWithAddRecord = (category) => {
    setModalIsOpen(true);
    setCategory(category);
  };

  const handleMonthYearChange = (event) => {
    setLocalSalaryDetails(prevState => ({
      ...prevState,
      monthYear: event.target.value,
    }));
  };

  // Update the parent component whenever localSalaryDetails changes
  useEffect(() => {
    setSalaryDetails(localSalaryDetails);
  }, [localSalaryDetails, setSalaryDetails]);

  return (
    <div className="h-[70vh] w-2/5 bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto">
      {Object.entries(localSalaryDetails).map(([key, value]) => (
        <div key={key}>
        {key !== 'monthYear' && (
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold capitalize">{key}</h3>
              <button
                style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }}
                className="rounded px-4"
                onClick={() => openModalWithAddRecord(key)}
              >
                + Add a record
              </button>
          </div>
        )}
        {key === 'monthYear' && (
          <label>
            Month and Year:
            <input type="month" value={value} onChange={handleMonthYearChange} />
          </label>
        )}
        {Array.isArray(value) && value.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-3">
            <span>{item.name}</span>
            <div className="flex justify-end items-center">
              <span className="font-semibold mr-4">RM {item.amount}</span>
              <div className="ml-4">
                <button
                  style={{ backgroundColor: '#EBB99E', color: '#000000' }}
                  className="mr-2 rounded px-4"
                  onClick={() => handleEditRecord(key, index)}
                >
                  Edit
                </button>
                  <button
                    style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }}
                    className="rounded px-4"
                    onClick={() => handleRemoveRecord(key, index)}
                  >
                    Remove
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      ))}
      <SalaryDialog
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        handleAddRecord={handleAddRecord}
        handleEditRecord={handleSaveEdit}
        editMode={!!editingRecord}
        existingTitle={editingRecord?.record.name}
        existingAmount={editingRecord?.record.amount}
        existingNotes={editingRecord?.record.notes}
      />
    </div>
  );
}

export default SalaryBox;