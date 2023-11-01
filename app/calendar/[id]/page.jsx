"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function createProfile() {
  const { id } = useParams();
  const router = useRouter();

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
       router.push('/') 
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Weight Tracker</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="weight" className="mb-2 font-semibold">
          Weight
        </label>
        <input
          id="weight"
          type="text"
          placeholder="Enter your weight"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.weight}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}