import React, { useState, useEffect } from 'react';
import './StartWorkoutModal.css'
// import { updateWorkoutToDatabase } from "./StartWorkoutApi.jsx";
// import { useParams } from "next/navigation";


export default function StartWorkoutModal({ workout, onClose }) {
  // const { id } = useParams();
  console.log(workout._id)
  const [editedWorkout, setEditedWorkout] = useState({ ...workout });
  const [shouldRefresh, setShouldRefresh] = useState(false);


  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
  }, [shouldRefresh]);
  const handleSave = async () => {
    try {
      // Call the updateWorkoutToDatabase function to update the workout
      const response = await fetch(`http://localhost:3006/workouts/${workout._id}`, {
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
      "_id": workout._id
      },
      body: JSON.stringify({...editedWorkout}) 
      
      }, setShouldRefresh(true) ); // Pass the ID of the workout you want to update
  
      // Handle the response as needed (e.g., show a success message)
      if (response.status === 200) {


        console.log('Workout updated successfully');
        setShouldRefresh(true)
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to update the workout:', error);
    }
    // Close the modal or perform other actions after saving the workout
    onClose();
  };

  return (
    <div className="my-workout-div-edit">
      <div className="modal-content">
        <div className="close-button-div">
        <button onClick={onClose} className="close-button"><svg
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
            </svg></button>
        </div>
      <div className="header">
        {/* <h2>Start Workout</h2> */}
        <h2>{editedWorkout.workoutName}</h2>
        <p>Date: <input type="date" value={editedWorkout.workoutDate} onChange={(e) => setEditedWorkout({ ...editedWorkout, workoutDate: e.target.value })} /></p>
        </div>

        <div className="exercise-section">
          {/* <h3>Exercise Details:</h3> */}
          {editedWorkout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-info">
              <div className="exercise-name-row-div">
              <p className="exercise-name-row-p"> {exercise.exerciseName}</p>
              </div>

              <div className="sets-reps-weight">
              <p>Sets: <input type="number" value={exercise.sets} onChange={(e) => {
                const newExercises = [...editedWorkout.exercises];
                newExercises[index].sets = parseInt(e.target.value);
                setEditedWorkout({ ...editedWorkout, exercises: newExercises });
              }} className="input-section"/></p>
              <p>Reps: <input type="number" value={exercise.reps} onChange={(e) => {
                const newExercises = [...editedWorkout.exercises];
                newExercises[index].reps = parseInt(e.target.value);
                setEditedWorkout({ ...editedWorkout, exercises: newExercises });
              }} className="input-section"/></p>
              <p>Weight: <input type="number" value={exercise.weight} onChange={(e) => {
                const newExercises = [...editedWorkout.exercises];
                newExercises[index].weight = parseInt(e.target.value);
                setEditedWorkout({ ...editedWorkout, exercises: newExercises });
              }} className="input-section"/></p>
</div>
            </div>
          ))}
        </div>
        <h3>Cardio:</h3>
        <div className="cardio-section">
          <div className="cardio-info">
          <p>Cardio Type: <input type="text" value={editedWorkout.cardio ? editedWorkout.cardio.cardioType : ''} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, cardioType: e.target.value } })} className="input-section"/></p>
          </div>
          <div className="duration-distance">
          <p>Duration (Minutes): <input type="number" value={editedWorkout.cardio ? editedWorkout.cardio.durationMinutes : 0} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, durationMinutes: e.target.value } })} className="input-section"/></p>
          <p>Distance: <input type="number" value={editedWorkout.cardio ? editedWorkout.cardio.distance : 0} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, distance: e.target.value } })} className="input-section"/></p>
          </div>
        </div>
        <div className="singlebutton">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md" onClick={handleSave}>Finish Workout</button>
        </div>
        {/* <button onClick={onClose}>Cancel</button> */}
      </div>
    </div>
  );
}
