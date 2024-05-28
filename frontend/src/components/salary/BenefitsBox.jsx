import React, { useEffect, useState } from 'react';
import BenefitsDialog from './BenefitsDialog';

function BenefitsBox({ setRoleBenefits, setIndividualBenefits }) {

  const [localRoleBenefits, setLocalRoleBenefits] = useState([
    {
      type: "Financial",
      benefits: [
        { name: "Benefit 1", notes: "something" },
        { name: "Benefit 2", notes: "something" },
        { name: "Benefit 3", notes: "something" }
      ]
    },
    {
      type: "Health",
      benefits: [
        { name: "Benefit 1", notes: "something" },
        { name: "Benefit 2", notes: "something" },
        { name: "Benefit 3", notes: "something" }
      ]
    },
    {
      type: "Other",
      benefits: [
        { name: "Benefit 1", notes: "something" },
        { name: "Benefit 2", notes: "something" },
        { name: "Benefit 3", notes: "something" }
      ]
    }
  ]);

  const [localIndividualBenefits, setLocalIndividualBenefits] = useState([
    { name: "Benefit 1", notes: "something" },
    { name: "Benefit 2", notes: "something" },
  ]);

  const processBenefits = (roleBenefits, individualBenefits) => {
    // Add type to role benefits
    const roleBenefitsWithType = roleBenefits.map(benefit => ({
      type: benefit.type,
      benefits: benefit.benefits
    }));

    // Add type to individual benefits
    const individualBenefitsWithType = {
      type: "Individual",
      benefits: individualBenefits
    };

    return [...roleBenefitsWithType, individualBenefitsWithType];
  };

  const [localBenefits, setLocalBenefits] = useState(processBenefits(localRoleBenefits, localIndividualBenefits));

  console.log(localBenefits);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [benefitType, setBenefitType] = useState('');

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
    closeModal();
  };

  const handleEditRecord = (categoryIndex, benefitIndex) => {
    const benefitCategory = localBenefits[categoryIndex];
    const benefit = benefitCategory.benefits[benefitIndex];
    setEditingRecord({ ...benefit, type: benefitCategory.type, categoryIndex, benefitIndex });
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
  };

  // Update the parent component whenever localBenefits changes
  useEffect(() => {
    const roleBenefits = localBenefits.filter(benefit => benefit.type !== "Individual");
    const individualBenefits = localBenefits.find(benefit => benefit.type === "Individual").benefits;
    setRoleBenefits(roleBenefits);
    setIndividualBenefits(individualBenefits);
  }, [localBenefits, setRoleBenefits, setIndividualBenefits]);

  console.log(editingRecord);
  
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
        <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="mr-2 rounded px-4">Cancel changes</button>
        <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4">Save</button>
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