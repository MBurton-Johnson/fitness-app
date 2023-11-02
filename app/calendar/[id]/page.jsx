"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function CreateProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState({ _id: null });
  const [weights, setWeights] = useState([]);

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
        const weightsData = await response.json();
        setWeights(weightsData);
      } catch (error) {
        console.error('Error fetching weights:', error);
      }
    }

    if (id) {
      fetchWeights();
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Weight Tracker</h1>
        <h1 className="mb-4">Starting Weight: {userData.weight} KG</h1>
        <h1 className="mb-4">Target Weight: {userData.goalWeight} KG</h1>
        <div>
          <ul className="list-disc pl-4">
            {weights.map((weight) => (
              <li key={weight._id}>
                Weight: {weight.weight} KG, Date: {new Date(weight.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="weight" className="mb-2 font-semibold">
            Enter your latest Weight (KG)
          </label>
          <input
            id="weight"
            type="number"
            step="0.01"
            placeholder="Weight (KG)"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
