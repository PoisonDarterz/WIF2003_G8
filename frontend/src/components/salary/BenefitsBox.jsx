import React from 'react';

const roleBenefits = [
  { type: "Financial", benefits: ["Benefit 1", "Benefit 2", "Benefit 3"] },
  { type: "Health", benefits: ["Benefit 1", "Benefit 2", "Benefit 3"] },
  { type: "Other", benefits: ["Benefit 1", "Benefit 2", "Benefit 3"] }
];

const personalBenefits = ["Benefit 1", "Benefit 2", "Benefit 3"];

function BenefitsBox() {
  return (
    <div className="h-[70vh] w-3/4 bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-left">Role benefits</h2>
      {roleBenefits.map((section, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">{section.type} benefits</h3>
            <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4">+ Add a record </button>
          </div>
          {section.benefits.map((benefit, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{benefit}</span>
              <div>
                <button style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }} className="mr-2 rounded px-4">Remove</button>
                <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="rounded px-4">Edit</button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">Individual benefits</h3>
          <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4">+ Add a record</button>
        </div>
        {personalBenefits.map((benefit, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{benefit}</span>
            <div>
              <button style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }} className="mr-2 rounded px-4">Remove</button>
              <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="rounded px-4">Edit</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="mr-2 rounded px-4">Cancel changes</button>
        <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4">Save</button>
      </div>
    </div>
  );
}

export default BenefitsBox;