import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

function SalaryDialog({ isOpen, onRequestClose, handleAddRecord, handleEditRecord, editMode, existingTitle, existingAmount, existingNotes }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editMode) {
      setTitle(existingTitle);
      setAmount(existingAmount);
      setNotes(existingNotes);
    }
  }, [editMode, existingTitle, existingAmount, existingNotes]);

  const handleAdd = () => {
    if (editMode) {
      handleEditRecord(title, amount, notes);
    } else {
      handleAddRecord(title, amount, notes);
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-[#B9DDDA] rounded-lg p-5"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit a record' : 'Add a record'}</h2>
      <label className="block mb-2">
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="block w-full border p-1 rounded mt-1" />
      </label>
      <label className="block mb-2">
        Amount: RM
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="block w-full border p-1 rounded mt-1" />
      </label>
      <label className="block mb-2">
        Additional notes for internal purposes:
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="block w-full border p-1 rounded mt-1 h-20" />
      </label>
      <h3 className="text-lg font-bold mb-4">Preview</h3>
      <div className="flex justify-between items-center mb-3">
        <span>{title}</span>
        <div className="flex justify-end items-center">
          <span className="font-semibold mr-4">RM {amount}</span>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={onRequestClose} className="px-4 py-2 bg-red-500 text-white rounded mr-2">Cancel</button>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded">{editMode ? 'Save changes' : 'Add record'}</button>
      </div>
    </Modal>
  );
}

export default SalaryDialog;