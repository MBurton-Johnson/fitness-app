'use client';
export async function addWorkoutToDatabase(requestData, id) {

    if (requestData.method === 'POST') {
      const { workoutName, exercises, cardio } = requestData.body;
  
      // Send a POST request to create a new workout
      const createWorkoutResponse = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/workouts/new/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ workoutName, exercises, cardio }),
      });
  
      if (createWorkoutResponse.status === 200) {
        console.log('Workout added successfully');
        return {
          workout: null,
        };
      } else {
        console.error('Failed to add the workout');
        return {
          workout: null,
        };
      }
    }
  
    return {
      workout: null,
    };
  }
  