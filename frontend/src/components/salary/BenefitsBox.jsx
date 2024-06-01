import React, { useEffect, useState } from 'react';
import BenefitsDialog from './BenefitsDialog';

function BenefitsBox({ handleSave, unsavedChanges, setUnsavedChanges, roleBenefits, individualBenefits }) {

  const [localBenefits, setLocalBenefits] = useState([]);

  useEffect(() => {
    const processedBenefits = processBenefits(roleBenefits, individualBenefits);
    setLocalBenefits(processedBenefits);
  }, [roleBenefits, individualBenefits]);

  const processBenefits = (roleBenefits, individualBenefits) => {
    // Process role benefits
    const roleBenefitsProcessed = roleBenefits.map(benefit => ({
      type: benefit.type,
      benefits: benefit.benefits.map(benefit => ({
        name: benefit.name,
        notes: benefit.notes,
      })),
    }));

    // Process individual benefits
    const individualBenefitsProcessed = {
      type: "Individual",
      benefits: individualBenefits.map(benefit => ({
        name: benefit.name,
        notes: benefit.notes,
      })),
    };

    return [...roleBenefitsProcessed, individualBenefitsProcessed];
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [benefitType, setBenefitType] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openAddRecordModal = (type) => {
    setBenefitType(type);
    openModal();
  };

  const handleAddRecord = (benefitObject) => {
    setLocalBenefits(prevBenefits => {
      const newBenefits = [...prevBenefits];
      const benefitCategory = newBenefits.find(benefit => benefit.type === benefitObject.type);
      if (benefitCategory) {
        benefitCategory.benefits.push(benefitObject.benefits);
      } else {
        newBenefits.push({ type: benefitObject.type, benefits: [benefitObject.benefits] });
      }
      return newBenefits;
    });
    setUnsavedChanges(true);
    closeModal();
  };

  const handleEditRecord = (categoryIndex, benefitIndex) => {
    const benefitCategory = localBenefits[categoryIndex];
    const benefit = benefitCategory.benefits[benefitIndex];
    setEditingRecord({ ...benefit, type: benefitCategory.type, categoryIndex, benefitIndex });
    setUnsavedChanges(true);
    openModal();
  };

  const handleSaveEdit = (benefitObject) => {
    const { name, notes } = benefitObject.benefits;
    setLocalBenefits(prevBenefits => {
      const newBenefits = [...prevBenefits];
      const benefitCategory = newBenefits[editingRecord.categoryIndex];
      if (benefitCategory) {
        benefitCategory.benefits[editingRecord.benefitIndex] = { name, notes };
      }
      return newBenefits;
    });
    setEditingRecord(null);
    closeModal();
  };

  const handleRemoveRecord = (categoryIndex, benefitIndex) => {
    setLocalBenefits(prevBenefits => {
      const newBenefits = [...prevBenefits];
      const benefitCategory = newBenefits[categoryIndex];
      if (benefitCategory) {
        benefitCategory.benefits = benefitCategory.benefits.filter((_, i) => i !== benefitIndex);
      }
      return newBenefits;
    });
    setUnsavedChanges(true);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard changes and refresh the page?')) {
      window.location.reload();
    }
  };

  useEffect(() => {
    window.onbeforeunload = unsavedChanges ? () => true : undefined;
    return () => {
      window.onbeforeunload = undefined;
    };
  }, [unsavedChanges]);

  return (
    <div className="h-[70vh] w-3/4 bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto">
      {localBenefits.map((benefitCategory, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">{benefitCategory.type} benefits</h3>
            <button
              style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }}
              className="rounded px-4"
              onClick={() => openAddRecordModal(benefitCategory.type)}
            >+ Add a record</button>
          </div>
          {benefitCategory.benefits.map((benefit, benefitIndex) => (
            <div key={benefitIndex} className="flex justify-between items-center mb-2">
              <span>{benefit.name}</span>
              <div>
                <button
                  style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }}
                  className="mr-2 rounded px-4"
                  onClick={() => handleRemoveRecord(index, benefitIndex)}
                >Remove</button>
                <button
                  style={{ backgroundColor: '#EBB99E', color: '#000000' }}
                  className="rounded px-4"
                  onClick={() => handleEditRecord(index, benefitIndex)}
                >Edit</button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="mr-2 rounded px-4" onClick={handleCancel}>Cancel changes</button>
        <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4" onClick={() => handleSave(localBenefits)}>Save</button>
      </div>
      <BenefitsDialog
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        handleAddRecord={handleAddRecord}
        handleEditRecord={handleSaveEdit}
        editMode={!!editingRecord}
        existingType={editingRecord?.type}
        existingBenefit={editingRecord?.name}
        existingNotes={editingRecord?.notes}
        benefitType={benefitType}
      />
    </div>
  );
}

export default BenefitsBox;