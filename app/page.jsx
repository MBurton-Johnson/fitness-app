"use client"

import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({ _id: null });
  const [weights, setWeights] = useState([]);
  const [recentWeight, setRecentWeight] = useState('')

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:3006/users/${session?.user?.email}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [session?.user?.email]);

  useEffect(() => {
    if (userData._id) {
      async function fetchWeights() {
        try {
          const response = await fetch(`http://localhost:3006/calendar/${userData._id}`);
          const weightsData = await response.json();
          setWeights(weightsData);
        } catch (error) {
          console.error('Error fetching weights:', error);
        }
      }

      fetchWeights();
    }
  }, [userData._id]);

  useEffect(() => {
    if (userData._id) {
      async function findMostRecentWeight() {
        try {
          const response = await fetch(`http://localhost:3006/calendar/recent/${userData._id}`)
          const mostRecent = await response.json()
          setRecentWeight(mostRecent)
        } catch (error) {
          console.error("Error finding most recent weight:", error)
        }
      }

      findMostRecentWeight()
    }
  }, [userData._id])

  const calculateProgress = () => {
    if (userData.goalWeight && recentWeight && recentWeight.weight) {
      const percentage = Math.round(((recentWeight.weight - userData.weight) / (userData.goalWeight - userData.weight)) * 100);
      return Math.min(100, Math.max(0, percentage));
    }
    return 0;
  };

  const progress = calculateProgress();

  return (
    <div>
      <UserInfo />
      <div className="mt-5">
        <h1>Target Weight: {userData.goalWeight}KG</h1>
        <h1>Target Calories for the day: {userData.goalCalories}</h1>
        {recentWeight && (
          <>
            <h2>Weights</h2>
            <h3>Most Recent Weight- {recentWeight.weight}KG</h3>
            <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-teal-600">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${progress}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progress < 25 ? 'bg-red-500' : progress < 50 ? 'bg-yellow-500' : progress < 75 ? 'bg-green-500' : 'bg-blue-500'}`}
              ></div>
            </div>
          </div>
          </>
        )}
        <ul>
          {weights.map((weight) => (
            <li key={weight._id}>
              Weight: {weight.weight}KG, Date: {new Date(weight.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


  