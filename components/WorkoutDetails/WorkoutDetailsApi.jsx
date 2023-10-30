import React from 'react';

// export default function WorkoutDetailPage({ workout }) {
//   return (
//     <div>
//       <h1>Workout Details</h1>
//       <p>Workout Name: {workout.workoutName}</p>
//       {/* Display other workout details */}
//     </div>
//   );
// }
export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3006/workouts/${id}`);
    const workout = await res.json();
    console.log(workout);
  
    return {
      props: { workout },
    };
  }
  