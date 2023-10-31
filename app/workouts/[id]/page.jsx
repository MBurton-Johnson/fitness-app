'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AddWorkoutModal from '@/components/AddWorkout/AddWorkoutModal';
import WorkoutModal from '@/components/WorkoutDetails/WorkoutDetailsModal';
// import StartWorkoutModal from '@/components/StartWorkout/StartWorkoutModal';
// import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

import { useParams } from "next/navigation";


export default function WorkoutPage() {
  const { id } = useParams();
  // const router = useRouter();
  // const userId = router.query.userId;
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Corrected variable name
//   const [isStartWorkoutModalOpen, setIsStartWorkoutModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3006/workouts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      "userId": id
      }
    })
    // console.log('userIdParamsUrl:', userId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setWorkouts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  , []);

  const openModal = (workout) => {
    setSelectedWorkout(workout);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

//   const openStartWorkoutModal = () => {
//     setIsStartWorkoutModalOpen(true);
//   };

//   const closeStartWorkoutModal = () => {
//     setIsStartWorkoutModalOpen(false);
//   };

  const handleCreateWorkout = (newWorkout) => {
    // Handle the creation of the new workout and sending it to the server
    console.log('New workout:', newWorkout);
    // Close the create workout modal
    closeCreateModal();
  };


  return (
    <div>
      <h1>Workouts</h1>
      <button onClick={openCreateModal}>Create New Workout</button>

       <ul>
        {workouts?.map((workout) => (
          <li key={workout?._id}>
            <a onClick={() => openModal(workout)}>{workout.workoutName}</a>
          </li>
        ))}
      </ul>
      {selectedWorkout &&  (
        <WorkoutModal workout={selectedWorkout} onClose={closeModal} />
      )}
         {/* {isStartWorkoutModalOpen && (
        <StartWorkoutModal workout={selectedWorkout} onClose={closeStartWorkoutModal} />
      )} */}
      {isCreateModalOpen && (
        <AddWorkoutModal onClose={closeCreateModal} onSave={handleCreateWorkout} session={useSession}/>

      )}
    </div>
  );
}
