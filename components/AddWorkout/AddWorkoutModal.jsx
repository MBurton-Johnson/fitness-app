import { useState } from "react";
import "../WorkoutDetails/WorkoutDetailsModal.css";
import "./AddWorkoutModal.css";
import { addWorkoutToDatabase } from "./AddWorkoutContext.js";
// import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function AddWorkoutModal({ onClose }) {
  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);
  // const { data: session } = useSession();
  const { id } = useParams();
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [cardioType, setCardioType] = useState("");
  // const [durationMinutes, setDurationMinutes] = useState("");
  // const [distance, setDistance] = useState("");
  const [isAddingCardio, setIsAddingCardio] = useState(false);

  const handleAddExercise = () => {
    // Add a new exercise to the exercises array
    setExercises([
      ...exercises,
      { exerciseName: "", sets: 0, reps: 0, weight: 0 },
    ]);
  };

  const handleAddCardio = () => {
    setIsAddingCardio(true);
  };

  const handleSave = async () => {
    // Create a new workout object
    const newWorkout = {
      workoutName,
      exercises,
      cardio: isAddingCardio
        ? {
            cardioType,
            // durationMinutes,
            // distance,
          }
        : null,
    };

    try {
      // Call the addWorkoutToDatabase function to add a new workout
      const response = await addWorkoutToDatabase(
        {
          method: "POST",
          body: newWorkout,
        },
        id
      );

      if (response.workout === null) {
        console.log("Workout saved successfully");
        window.location.reload();
        onClose(); // Close the modal
        
      } else {
        console.error("Failed to save the workout");
      }
    } catch (error) {
      console.error("An error occurred while saving the workout:", error);
    }
  };

  const handleCancel = () => {
    // Close the modal without saving
    onClose();
  };

  return (
    <div className="my-workout-div">
      <div className="modal-content">

      <div className="close-div">
        <button onClick={handleCancel} className="close-button">
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

        <div className="header-addworkout">
          <h2>Add New Workout</h2>
        </div>

        <div className="name-section">
          {" "}
          {/* Apply padding and margin classes */}
          <label>
            {/* <span className="name">Workout Name:</span> */}
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Workout Name"
              className="input-section-name"
            />
          </label>
        </div>

        <div className="exercises-section">
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-info">

              <div className="exercise-name-row">
                {" "}
                {/* Apply padding and margin classes */}
                <label>
                  {/* <span className="font-bold">Exercise Name:</span> */}
                  <input
                    type="text"
                    value={exercise.exerciseName}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].exerciseName = e.target.value;
                      setExercises(newExercises);
                    }}
                    placeholder="Exercise Name"
                    className="input-section" // Use the same classes
                  />
                </label>
              </div>

              <div className="sets-reps-weight">
                <label>
                  Sets:
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].sets = parseInt(e.target.value);
                      setExercises(newExercises);
                    }}
                    placeholder="Sets"
                    className="input-section"
                  />
                </label>
                <label>
                  Reps:
                  <input
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].reps = parseInt(e.target.value);
                      setExercises(newExercises);
                    }}
                    className="input-section"
                  />
                </label>
                <label>
                  Weight:
                  <input
                    type="number"
                    value={exercise.weight}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].weight = parseInt(e.target.value);
                      setExercises(newExercises);
                    }}
                    className="input-section"
                  />
                </label>
              </div>
            </div>
          ))}
          <div className="singlebutton">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
            onClick={handleAddExercise}
          >
            Add Exercise
          </button>
          </div>
        </div>

        <div className="cardio-section">

          {isAddingCardio ? (
            <div className="name-section">
              {" "}
              <label>
                {/* Cardio Type: */}
                <input
                  type="text"
                  value={cardioType}
                  onChange={(e) => setCardioType(e.target.value)}
                  placeholder="Cardio"
                  className="input-section-name"
                />
              </label>
              {/* <label>
                Duration (Minutes):
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                />
              </label>
              <label>
                Distance:
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </label> */}
            </div>
          ) : (
            <div className="singlebutton">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={handleAddCardio}
            >
              Add Cardio
            </button>
            </div>
          )}
          <div className="singlebutton">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={handleSave}
            >
              Save Workout
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
