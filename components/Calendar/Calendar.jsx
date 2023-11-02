'use client'

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./Calendar.css";

const Calendar = () => {
  const { id } = useParams();
  const [workouts, setWorkouts] = useState([]);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Calculate the start date of the current month (1st day)
  const startDate = new Date(currentYear, currentMonth, 1);

  // Calculate the end date of the current month (last day)
  const endDate = new Date(currentYear, currentMonth + 1, 0);

  const fetchWorkouts = () => {
    // Simulated data fetch. Replace with your actual data fetching logic.
    return fetch(`http://localhost:3006/workouts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userId: id,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  };

  // Fetch workouts when the component mounts or when dependencies change
  useEffect(() => {
    // Fetch workouts here (e.g., an API call)
    fetchWorkouts().then((data) => {
      setWorkouts(data);
    });
  }, [currentYear, currentMonth]);

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className="calendar">
      {Array.from({ length: endDate.getDate() }).map((_, day) => {
        const currentDate = new Date(currentYear, currentMonth, day + 1);

        const workout = workouts.find((w) =>
          isSameDay(new Date(w.workoutDate), currentDate)
        );

        return (
          <div key={day} className={`day ${workout ? "has-workout" : ""}`}>
            {currentDate.getDate()}
            {workout && <div>{workout.workoutName}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
