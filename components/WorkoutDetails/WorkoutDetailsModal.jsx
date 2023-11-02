import React, { useState } from "react";
import "./WorkoutDetailsModal.css";
import StartWorkoutModal from "../StartWorkout/StartWorkoutModal";
import WorkoutDetailsModal from "../WorkoutDetails/WorkoutDetailsModal";

function formatPrettyDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function WorkoutModal({ workout, onClose }) {
  const [isStartWorkoutModalOpen, setIsStartWorkoutModalOpen] = useState(false);
  const [isWorkoutDetailsModalOpen, setIsWorkoutDetailsModalOpen] =
    useState(false);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3006/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "_id": workout._id
        }
      }); // Remove the extra closing parenthesis here
  
      if (response.status === 200) {
        console.log("Workout deleted");
        onClose(); // Close the modal after successful deletion
        window.location.reload();
      } else {
        console.error("Error deleting workout");
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error deleting workout", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  return (
    <div className="my-workout-div">
      <div className="modal-content">
        {/* <h2>Workout Details</h2> */}

        <div className="close-div">
        <button onClick={closeWorkoutDetails} className="close-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M9.293 8l3.854-3.854a1 1 0 10-1.414-1.414L8 6.586 4.146 2.732a1 1 0 10-1.414 1.414L6.586 8l-3.854 3.854a1 1 0 101.414 1.414L8 9.414l3.854 3.854a1 1 0 001.414-1.414L9.414 8z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="header-details">
          <h2>{workout.workoutName}</h2>
          
        </div>

        <div className="last-performed">
        <h3>
          Last Performed:{" "}
          {workout.workoutDate ? formatPrettyDate(workout.workoutDate) : "Not yet performed"}
        </h3>
        </div>
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
        {/* <button onClick={closeWorkoutDetails}>Close</button> */}
        <div className="singlebutton">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
            onClick={openStartWorkoutModal}
          >
            Start Workout
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-md" onClick={handleDelete}>
  Delete Workout
</button>
        </div>
        {isStartWorkoutModalOpen && (
          <StartWorkoutModal workout={workout} onClose={closeWorkoutDetails} />
        )}
        {isWorkoutDetailsModalOpen && (
          <WorkoutDetailsModal
            workout={workout}
            onClose={closeWorkoutDetails}
          />
        )}
      </div>
    </div>
  );
}
