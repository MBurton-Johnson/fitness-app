"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
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

  const [isWeightSet, setIsWeightSet] = useState(false);


  useEffect(() => {
    // Fetch user data here based on the 'id'
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3006/users/one/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData({
            gender: userData.gender || "Male", // Provide default value if it's undefined
            age: userData.age || "",
            height: userData.height || "",
            weight: userData.weight || "",
            goalWeight: userData.goalWeight
          });
          setIsWeightSet(!!userData.weight);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]); 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3006/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User updated successfully");
        setIsWeightSet(!!formData.weight)
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
      <h1 className="text-3xl font-bold mb-6">Create Profile</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="gender" className="mb-2 font-semibold">
          Gender
        </label>
        <select
          id="gender"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="age" className="mb-2 font-semibold">
          Age
        </label>
        <input
          id="age"
          type="number"
          placeholder="Enter your age"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.age}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="height" className="mb-2 font-semibold">
          Height
        </label>
        <input
          id="height"
          type="text"
          placeholder="Enter your height"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.height}
          onChange={handleInputChange}
        />
      </div>
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
          disabled={isWeightSet}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="weight" className="mb-2 font-semibold">
          Target Weight
        </label>
        <input
          id="goalWeight"
          type="text"
          placeholder="Enter your target weight"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.goalWeight}
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
