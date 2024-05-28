import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

function BenefitsDialog({ isOpen, onRequestClose, handleAddRecord, handleEditRecord, editMode, existingType, existingBenefit, existingNotes, benefitType }) {
  const [benefit, setBenefit] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (editMode) {
      setBenefit(existingBenefit);
      setNotes(existingNotes);
      setType(existingType);
    } else {
      setBenefit('');
      setNotes('');
      setType(existingType); // set type directly from prop
    }
  }, [editMode, existingType, existingBenefit, existingNotes]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const benefitObject = { type: benefitType, benefits: { name: benefit, notes: notes } };
    if (editMode) {
      handleEditRecord(benefitObject);
    } else {
      handleAddRecord(benefitObject);
    }
    setBenefit('');
    setNotes(''); 
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-[#B9DDDA] rounded-lg p-5"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit record' : 'Add a record'}</h2>
      <label className="block mb-2">
        Benefit:
        <input
          type="text"
          className="block w-full border p-1 rounded mt-1"
          value={benefit}
          onChange={(e) => setBenefit(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Additional notes for internal purposes:
        <textarea
          className="block w-full border p-1 rounded mt-1 h-20"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <div className="flex justify-end mt-4">
        <button onClick={onRequestClose} className="px-4 py-2 border rounded mr-2" style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }}>Cancel</button>
        <button onClick={handleSubmit} type="submit" className="px-4 py-2 text-white rounded" style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }}>{editMode ? 'Save changes' : 'Add record'}</button>
      </div>
    </Modal>
  );
}

export default BenefitsDialog;