import React from 'react';
import Modal from 'react-modal';

function BenefitsDialog({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-[#B9DDDA] rounded-lg p-5"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add a record</h2>
      <label className="block mb-2">
        Benefit:
        <input type="text" className="block w-full border p-1 rounded mt-1" />
      </label>
      <label className="block mb-2">
        Additional notes for internal purposes:
        <textarea className="block w-full border p-1 rounded mt-1 h-20" />
      </label>
      <div className="flex justify-end mt-4">
        <button onClick={onRequestClose} className="px-4 py-2 border rounded mr-2" style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }}>Cancel</button>
        <button className="px-4 py-2 text-white rounded" style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }}>Add record</button>
      </div>
    </Modal>
  );
}

export default BenefitsDialog;