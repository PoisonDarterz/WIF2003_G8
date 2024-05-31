import React, { useState, useEffect } from "react";
import axios from 'axios';
import TopNavBlack from "../../components/TopNavBlack";

function Benefits() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleBenefits, setRoleBenefits] = useState([]);
  const [personalBenefits, setPersonalBenefits] = useState([]);

  useEffect(() => {
    const fetchUserBenefits = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/benefits/my-benefits', {
          withCredentials: true,
        });
        const { roleName, roleBenefits, personalBenefits } = response.data;

        setRoleName(roleName);
        setRoleBenefits(roleBenefits);
        setPersonalBenefits(personalBenefits);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user benefits:', error);
        setError('Failed to fetch user benefits.');
        setLoading(false);
      }
    };

    fetchUserBenefits();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

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
      <h2 className="text-xl font-bold">As a <span className="italic">{roleName}</span>, you are entitled to the following benefits:</h2>
        <div className="mt-4">
          {roleBenefits.map((role, i) => (
            <div key={i} className="mt-4">
              <h3 className="text-lg font-bold">{role.type}</h3>
              <ul className="list-disc ml-8">
                {role.benefits.map((benefit, j) => (
                  <li key={j}>
                    <p className="text-blue-500 font-bold">{benefit.benefit}</p> 
                    <p className="text-black italic">{benefit.notes}</p> 
                  </li>
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
              <li key={i}>
                <p className="text-blue-500 font-bold">{benefit.benefit}</p> 
                <p className="text-black italic">{benefit.notes}</p> 
              </li>
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
