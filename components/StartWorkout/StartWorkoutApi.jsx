'use client';
export async function updateWorkoutToDatabase(requestData, id) {
console.log(id)
    if (requestData.method === 'PUT') {
      const { workoutDate, exercises, cardio } = requestData.body;
  
      // Send a PUT request to update the workout
      const updateWorkoutResponse = await fetch(`http://localhost:3006/workouts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutDate, exercises, cardio ), // Pass the editedWorkout object directly
      });
  
      if (updateWorkoutResponse.status === 200) {
        console.log('Workout edited successfully');
        return {
          editedWorkout: null,
        };
      } else {
        console.error('Failed to update the workout');
        return {
          editedWorkout: null,
        };
      }
    }
  
    return {
      workout: null,
    };
}
