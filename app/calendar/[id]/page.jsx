"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import '/components/AddWeight/Calendar.css';
import Modal from 'react-modal';

export default function CreateProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState({ _id: null });
  const [weights, setWeights] = useState([]);
  const [weightModalIsOpen, setWeightModalIsOpen] = useState(false);
  const [currentWeight, setCurrentWeight] = useState({});


  const [formData, setFormData] = useState({
    gender: "Male",
    age: "",
    height: "",
    weight: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3006/calendar/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: id, // Add the user ID to the request body
        }),
      });

      if (response.ok) {
        console.log("Calendar updated successfully");
        router.push('/');
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:3006/users/one/${id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [id]);

  useEffect(() => {
    async function fetchWeights() {
      try {
        const response = await fetch(`http://localhost:3006/calendar/${id}`);
        let weightsData = await response.json();
        weightsData = weightsData.sort((a, b) => new Date(b.date) - new Date(a.date));  // Sorting here
        setWeights(weightsData);
      } catch (error) {
        console.error('Error fetching weights:', error);
      }
    }
    if (id) {
      fetchWeights();
    }
  }, [id]);

  const handleOpenWeightModal = (weight = {}) => {
    setCurrentWeight(weight);
    setWeightModalIsOpen(true);
  };
  
  const handleCloseWeightModal = () => {
    setCurrentWeight({});
    setWeightModalIsOpen(false);
  };
  
  const handleWeightUpdate = async (e) => {
    e.preventDefault();
    // Make API call to update the weight entry using currentWeight._id
    // Fetch updated weights afterwards or update the local state to reflect changes.
    // Close the modal afterwards.
    handleCloseWeightModal();
  };
  
  const handleDeleteWeight = async (weightId) => {
    // Make API call to delete the weight entry using weightId.
    // Fetch updated weights afterwards or update the local state to reflect changes.
    handleCloseWeightModal();
  };
  
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-4 mt-4">Weight Tracker</h1>

    <div className="bg-white border border-gray-300 rounded-md p-6 mx-4 max-w-screen-md mb-8 text-center common-width flex flex-col items-center width-adjusted">
      <label 
    htmlFor="weight" 
    className="mb-1.5 font-bold text-2xl border-b border-gray-300 pb-2.5 w-full text-center">
    Enter Weight (kg)
</label>
    <input
        id="weight"
        type="number"
        step="0.01"
        placeholder="Weight (kg)"
        className="px-4 py-2 border border-gray-300 rounded-md mb-3 mt-2 w-1/3"  // Added w-1/3
        value={formData.weight}
        onChange={handleInputChange}
    />
    <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3 mt-2"  // Added w-1/3 and mt-4 for some top margin
        onClick={handleSubmit}
    >
        Submit
    </button>
</div>

<div className="flex items-center space-x-4 mb-8 w-full justify-center"> {/* Flex container for weight boxes */}
      <div className="bg-white border border-gray-300 rounded-md p-4 w-40 text-center"> {/* Box styling */}
        <h1>Starting Weight:</h1>
        <p className="font-bold">{userData.weight} kg</p>
      </div>

      <div className="bg-white border border-gray-300 rounded-md p-4 w-40 text-center"> {/* Box styling for current weight */}
        <h1>Current Weight:</h1>
        <p className="font-bold">{weights.length > 0 ? weights[0].weight : "N/A"} kg</p>
      </div>

      <div className="bg-white border border-gray-300 rounded-md p-4 w-40 text-center"> {/* Box styling for target weight */}
        <h1>Target Weight:</h1>
        <p className="font-bold">{userData.goalWeight} kg</p>
      </div>
    </div>

    <div className="bg-white p-8 rounded shadow-lg mx-4 max-w-screen-md common-width width-adjusted">
  <ul className="list-none pl-0">
    {weights.map((weight, index) => (
      <div key={weight._id}>
        {index > 0 && (
          <div className="my-2 border-t border-gray-300 h-px"></div>
        )}
        <li className="mb-4 last:mb-0">
        <div className="p-2 bg-gray-300" onClick={() => handleOpenWeightModal(weight)}> 
            <div className="font-bold">
              {new Date(weight.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div>{weight.weight} kg</div>
          </div>
        </li>
      </div>
    ))}
  </ul>
</div>

<Modal isOpen={weightModalIsOpen} onRequestClose={handleCloseWeightModal} contentLabel="Weight Modal">
  <h2>{currentWeight._id ? 'Update' : 'Add'} Weight</h2>
  <form onSubmit={handleWeightUpdate}>
      <input
          type="number"
          value={currentWeight.weight || ''}
          onChange={(e) => setCurrentWeight({ ...currentWeight, weight: e.target.value })}
          placeholder="Weight (kg)"
      />
      <button type="submit">Update</button>
      <button onClick={() => handleDeleteWeight(currentWeight._id)}>Delete</button>
  </form>
</Modal>

    </div>
  );
}  