'use client'

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./Calendar.css";

const Calendar = () => {
  const { id } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Add a flag to control data loading

  


  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate(); // Get the current day of the month


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
    const currentDayStart = new Date(currentYear, currentMonth, currentDay);
    const currentDayEnd = new Date(currentYear, currentMonth, currentDay, 23, 59, 59); // Set the end time to the end of the day

    // Fetch workouts here (e.g., an API call)
    fetchWorkouts(currentDayStart, currentDayEnd).then((data) => {
      setWorkouts(data);
    });
  }, [currentYear, currentMonth, currentDay]);

  


  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const renderWeeks = () => {
    const weeks = [];
    let currentWeek = [];
    const daysInWeek = 7;

    // Calculate the day of the week for the 1st day of the month
    const dayOfWeek = startDate.getDay();

    // Create blank cells for days before the 1st day of the month
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push(
        <div key={`blank-${i}`} className="day blank">
          {/* Empty cell */}
        </div>
      );
    }

    for (let day = 1; day <= endDate.getDate(); day++) {
      const currentDate = new Date(currentYear, currentMonth, day);

      const workout = workouts.find((w) =>
        isSameDay(new Date(w.workoutDate), currentDate)
      );

      currentWeek.push(
        <div
          key={day}
          className={`day ${workout ? "has-workout" : ""}`}
        >
          {currentDate.getDate()}
          {/* {workout && <div>{workout.workoutName}</div>} */}
        </div>
      );

      if (currentDate.getDay() === 0 || day === endDate.getDate()) {
        weeks.push(
          <div key={weeks.length} className="week">
            {currentWeek}
          </div>
        );
        currentWeek = [];
      }
    }

    return weeks;
  };

  return (
    <div className="calendar">
      <div className="month-header">
        {getMonthName(currentMonth)} {currentYear}
      </div>
      {renderWeeks()}
    </div>
  );
};

// Helper function to get the month name from the month number (0 to 11)
const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber];
};


export default Calendar;
