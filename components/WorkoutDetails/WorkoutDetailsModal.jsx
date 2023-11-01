import React, { useState } from "react";
import "./WorkoutDetailsModal.css";
import StartWorkoutModal from "../StartWorkout/StartWorkoutModal";
import WorkoutDetailsModal from "../WorkoutDetails/WorkoutDetailsModal";

export default function WorkoutModal({ workout, onClose }) {
  const [isStartWorkoutModalOpen, setIsStartWorkoutModalOpen] = useState(false);
  const [isWorkoutDetailsModalOpen, setIsWorkoutDetailsModalOpen] = useState(false);

  const openStartWorkoutModal = () => {
    setIsStartWorkoutModalOpen(true);
    setIsWorkoutDetailsModalOpen(false); // Close Workout Details
  };

  const openWorkoutDetailsModal = () => {
    setIsWorkoutDetailsModalOpen(true);
  };

  const closeWorkoutDetails = () => {
    setIsWorkoutDetailsModalOpen(false);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Workout Details</h2>
        <p>{workout.workoutName}</p>
        <h3>Last Performed: {workout.workoutDate ? workout.workoutDate : "Not yet performed"}</h3>
        {/* <h3>Exercises:</h3> */}
        <ul>
          {workout.exercises.map((exercise, index) => (
            <li key={index}>
              <p>
                {exercise.sets}x {exercise.exerciseName}
              </p>
            </li>
          ))}
        </ul>
        {/* <h3>Cardio:</h3> */}
        {workout.cardio ? (
          <div>
            <p>Cardio: {workout.cardio.cardioType}</p>
          </div>
        ) : (
          <p>No cardio data available</p>
        )}
        <button onClick={closeWorkoutDetails}>Close</button>
        <button onClick={openStartWorkoutModal}>Start Workout</button>
        {isStartWorkoutModalOpen && (
          <StartWorkoutModal workout={workout} onClose={closeWorkoutDetails} />
        )}
        {isWorkoutDetailsModalOpen && (
          <WorkoutDetailsModal workout={workout} onClose={closeWorkoutDetails} />
        )}
      </div>
    </div>
  );
}
