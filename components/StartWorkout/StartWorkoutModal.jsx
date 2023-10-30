import React, { useState } from 'react';

export default function StartWorkoutModal({ workout, onClose }) {
  const [editedWorkout, setEditedWorkout] = useState(workout);

  const handleSave = () => {
    // Handle saving the edited workout details for starting the workout
    console.log('Edited Workout for Starting Workout:', editedWorkout);
    onClose(); // Close the StartWorkoutModal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Start Workout</h2>
        <p>Workout Name: {editedWorkout.workoutName}</p>
        <div className="exercise-details">
          <h3>Exercise Details:</h3>
          {editedWorkout.exercises.map((exercise, index) => (
            <div key={index} className="exercise">
              <p>Exercise Name: {exercise.exerciseName}</p>
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
          ))}
        </div>
        <h3>Cardio:</h3>
        <div className="cardio">
          <p>Date: <input type="date" value={editedWorkout.workoutDate} onChange={(e) => setEditedWorkout({ ...editedWorkout, workoutDate: e.target.value })} /></p>
          <p>Cardio Type: <input type="text" value={editedWorkout.cardio ? editedWorkout.cardio.cardioType : ''} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, cardioType: e.target.value } })} /></p>
          <p>Duration (Minutes): <input type="number" value={editedWorkout.cardio ? editedWorkout.cardio.durationMinutes : 0} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, durationMinutes: e.target.value } })} /></p>
          <p>Distance: <input type="number" value={editedWorkout.cardio ? editedWorkout.cardio.distance : 0} onChange={(e) => setEditedWorkout({ ...editedWorkout, cardio: { ...editedWorkout.cardio, distance: e.target.value } })} /></p>
        </div>
        <button onClick={handleSave}>Finish Workout</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
