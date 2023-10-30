import React, { useState } from 'react';
// import '../WorkoutDetails/WorkoutDetailsModal.css';
import './AddWorkoutModal.css'
import {addWorkoutToDatabase} from './AddWorkoutContext.js'

export default function AddWorkoutModal({ onClose }) {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [cardioType, setCardioType] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [distance, setDistance] = useState('');
  const [isAddingCardio, setIsAddingCardio] = useState(false);

  const handleAddExercise = () => {
    // Add a new exercise to the exercises array
    setExercises([...exercises, { exerciseName: '', sets: 0, reps: 0, weight: 0 }]);
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
            durationMinutes,
            distance,
          }
        : null,
    };

    try {
      // Call the addWorkoutToDatabase function to add a new workout
      const response = await addWorkoutToDatabase({
        method: 'POST',
        body: newWorkout,
      });

      if (response.workout === null) {
        console.log('Workout saved successfully');
        onClose(); // Close the modal
      } else {
        console.error('Failed to save the workout');
      }
    } catch (error) {
      console.error('An error occurred while saving the workout:', error);
    }
  }

  const handleCancel = () => {
    // Close the modal without saving
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Workout</h2>
        <div className="button-container">
          <button onClick={handleSave}>Save Workout</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <label>
          Workout Name:
          <input type="text" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
        </label>
        <div className="exercises-section">
          {exercises.map((exercise, index) => (
            <div key={index}>
              <label>
                Exercise Name:
                <input
                  type="text"
                  value={exercise.exerciseName}
                  onChange={(e) => {
                    const newExercises = [...exercises];
                    newExercises[index].exerciseName = e.target.value;
                    setExercises(newExercises);
                  }}
                />
              </label>
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
                />
              </label>
            </div>
          ))}
          <button onClick={handleAddExercise}>Add Exercise</button>
        </div>
        <div className="cardio-section">
          {isAddingCardio ? (
            <div>
              <label>
                Cardio Type:
                <input
                  type="text"
                  value={cardioType}
                  onChange={(e) => setCardioType(e.target.value)}
                />
              </label>
              <label>
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
              </label>
            </div>
          ) : (
            <button onClick={handleAddCardio}>Add Cardio</button>
          )}
        </div>
      </div>
    </div>
  );
}
