"use client";

import { UseParams } from "next/navigation";
import { UseState, UseEffect } from "react";
import { UseRouter } from 'next/navigation';

export default function createProfile() {
  const { id } = UseParams();
  const router = UseRouter();

  const [formData, setFormData] = UseState({
    gender: "Male",
    age: "",
    height: "",
    weight: "",
    goalWeight: "",
    goalCalories: "",
  });

  const [isWeightSet, setIsWeightSet] = UseState(false);


  UseEffect(() => {
    // Fetch user data here based on the 'id'
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/users/one/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData({
            gender: userData.gender || "Male", // Provide default value if it's undefined
            age: userData.age || "",
            height: userData.height || "",
            weight: userData.weight || "",
            goalWeight: userData.goalWeight || "",
            goalCalories: userData.goalCalories || "",
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${id}`, {
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
    <div className="flex flex-col items-center justify-center h-screen bg-red">
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
        step="1"
        placeholder="Age"
        className="px-4 py-2 border border-gray-300 rounded-md"
        value={formData.age}
        onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="height" className="mb-2 font-semibold">
          Height (cm)
        </label>
        <input
          id="height"
          type="number"
          step="0.01"
          placeholder="Height (cm)"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.height}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="weight" className="mb-2 font-semibold">
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          step="0.01"
          placeholder="Weight (KG)"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.weight}
          onChange={handleInputChange}
          // disabled={isWeightSet}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="weight" className="mb-2 font-semibold">
          Target Weight (kg)
        </label>
        <input
          id="goalWeight"
          type="number"
          step="0.01"
          placeholder="Enter your target weight"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.goalWeight}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="weight" className="mb-2 font-semibold">
          Calory Goal for each day (kcal)
        </label>
        <input
          id="goalCalories"
          type="number"
          step="1"
          placeholder="Enter your target calories"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={formData.goalCalories}
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
