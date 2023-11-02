"use client"

import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';


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

  const getProgressBarColor = (percentage) => {
    if (percentage < 25) return '#FF0000'; // Red
    if (percentage < 50) return '#FFA500'; // Orange
    if (percentage < 75) return '#0000FF'; // Yellow
    return '#00FF00'; // Green
  };

  const progressBarColor = getProgressBarColor(progress);

  return (
    <div>
      <UserInfo />
      <div className="mt-5">
        {recentWeight && (
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-full p-4 m-5">
            <h1 className="font-bold text-xl mb-2">Weight Target</h1>
            <div className="relative pt-1">
              <div className="flex justify-center items-center">
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  styles={{
                    root: {},
                    path: {
                      stroke: progressBarColor,
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    text: {
                      fill: progressBarColor,
                      fontSize: '16px',
                    },
                    trail: {
                      stroke: '#d6d6d6',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

  