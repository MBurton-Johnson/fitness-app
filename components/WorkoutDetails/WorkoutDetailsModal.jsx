import React, { useState } from 'react';
import './WorkoutDetailsModal.css';
import StartWorkoutModal from '../StartWorkout/StartWorkoutModal';

export default function WorkoutModal({ workout, onClose }) {
  const [isStartWorkoutModalOpen, setIsStartWorkoutModalOpen] = useState(false);

  const handleStartWorkout = () => {
    setIsStartWorkoutModalOpen(true);
  };

  const closeWorkoutDetails = () => {
    setIsStartWorkoutModalOpen(false);
    onClose(); // Close the WorkoutDetailsModal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Workout Details</h2>
        <p>Workout Name: {workout.workoutName}</p>
        <h3>Exercises:</h3>
        <ul>
          {workout.exercises.map((exercise, index) => (
            <li key={index}>
              <p>
                {exercise.sets}x {exercise.exerciseName}
              </p>
            </li>
          ))}
        </ul>
        <h3>Cardio:</h3>
        {workout.cardio ? (
          <div>
            <p>Cardio Type: {workout.cardio.cardioType}</p>
          </div>
        ) : (
          <p>No cardio data available</p>
        )}
        <button onClick={closeWorkoutDetails}>Close</button>
        <button onClick={handleStartWorkout}>Start Workout</button>
        {isStartWorkoutModalOpen ? (
          <StartWorkoutModal workout={workout} onClose={closeWorkoutDetails} />
        ) : null}
      </div>
    </div>
  );
}
