import React from "react";
import TopNavBlack from "../../components/TopNavBlack";

const roleBenefits = [
  { type: "Financial", benefits: ["Benefit 1", "Benefit 2", "Benefit 3"] },
  { type: "Health", benefits: ["Benefit 1", "Benefit 2", "Benefit 3"] },
  { type: "Other", benefits: ["Benefit 1", "Benefit 2", "Benefit 3"] }
]

const personalBenefits = ["Benefit 1", "Benefit 2", "Benefit 3"];

function Benefits() {
  return (
    <div className="p-8">
      <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
        <TopNavBlack />
      </div>
      <div className="mt-8 mb-4 text-left">
        <h1 className="text-2xl font-bold">Benefits</h1>
        <p className="text-lg">View all your benefits here.</p>
      </div>
      <div className="mt-10 p-4 text-left">
        <h2 className="text-xl font-bold">As a (Role), you are entitled to the following benefits:</h2>
        <div className="mt-4">
          {roleBenefits.map((role, i) => (
            <div key={i} className="mt-4">
              <h3 className="text-lg font-bold">{role.type}</h3>
              <ul className="list-disc ml-8">
                {role.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 p-4 text-left">
        <h2 className="text-xl font-bold">You are also entitled to the following individual benefits:</h2>
        <div className="mt-4">
          <ul className="list-disc ml-8">
            {personalBenefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 p-4 text-left">
        <h2 className="text-xl font-bold">Need more information?</h2>
        <p className="mt-4">Contact your HR representative for more information <a href="/helpdesk/addNewTicket" className="text-blue-500 underline">here.</a></p>
      </div>
    </div>
  );
}

export default Benefits;