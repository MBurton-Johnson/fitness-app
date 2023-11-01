import React, { useState } from 'react';
// import { updateWorkoutToDatabase } from "./StartWorkoutApi.jsx";
// import { useParams } from "next/navigation";


export default function StartWorkoutModal({ workout, onClose }) {
  // const { id } = useParams();
  console.log(workout._id)
  const [editedWorkout, setEditedWorkout] = useState({ ...workout });
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
      },); // Pass the ID of the workout you want to update
  
      // Handle the response as needed (e.g., show a success message)
      if (response.workout === null) {
        console.log('Workout updated successfully');
      }
    } catch (error) {
      console.error('Failed to update the workout:', error);
    }
    // Close the modal or perform other actions after saving the workout
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Start Workout</h2>
        <p>Workout Name: {editedWorkout.workoutName}</p>
        <p>Date: <input type="date" value={editedWorkout.workoutDate} onChange={(e) => setEditedWorkout({ ...editedWorkout, workoutDate: e.target.value })} /></p>

        <div className="exercise-section">
          {/* <h3>Exercise Details:</h3> */}
          {editedWorkout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-info">
              <div className="exercise-name-row">
              <p> {exercise.exerciseName}</p>
              </div>
              <div className="sets-reps-weight">
              <p>Sets: <input type="number" value={exercise.sets} onChange={(e) => {
                const newExercises = [...editedWorkout.exercises];
                newExercises[index].sets = parseInt(e.target.value);
                setEditedWorkout({ ...editedWorkout, exercises: newExercises });
              }} /></p>
              <p>Reps: <input type="number" value={exercise.reps} onChange={(e) => {
                const newExercises = [...editedWorkout.exercises];
                newExercises[index].reps = parseInt(e.target.value);
                setEditedWorkout({ ...editedWorkout, exercises: newExercises });
              }} /></p>
              <p>Weight: <input type="number" value={exercise.weight} onChange={(e) => {
                const newExercises = [...editedWorkout.exercises];
                newExercises[index].weight = parseInt(e.target.value);
                setEditedWorkout({ ...editedWorkout, exercises: newExercises });
              }} /></p>
</div>
            </div>
          ))}
        </div>
        <h3>Cardio:</h3>
        <div className="cardio-section">
          <div className="cardion-info">
          <p>Cardio Type: <input type="text" value={editedWorkout.cardio ? editedWorkout.cardio.cardioType : ''} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, cardioType: e.target.value } })} /></p>
          </div>
          <div className="duration-distance">
          <p>Duration (Minutes): <input type="number" value={editedWorkout.cardio ? editedWorkout.cardio.durationMinutes : 0} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, durationMinutes: e.target.value } })} /></p>
          <p>Distance: <input type="number" value={editedWorkout.cardio ? editedWorkout.cardio.distance : 0} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, distance: e.target.value } })} /></p>
          </div>
        </div>
        <button onClick={handleSave}>Finish Workout</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
