"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddWorkoutModal from "@/components/AddWorkout/AddWorkoutModal";
import WorkoutModal from "@/components/WorkoutDetails/WorkoutDetailsModal";
// import StartWorkoutModal from '@/components/StartWorkout/StartWorkoutModal';
// import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

import { useParams } from "next/navigation";
import "./page.css"; // Import your CSS file
import Calendar from "@/components/Calendar/Calendar";

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
        userId: id,
      },
    })
      // console.log('userIdParamsUrl:', userId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkouts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
    console.log("New workout:", newWorkout);
    // Close the create workout modal
    closeCreateModal();
  };

  return (
    <>
      <div>
        <div className="workout-content">
          <div className="top-section">
          <div className="workout-buttons">
            <button
              onClick={openCreateModal}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Create New Workout
            </button>
          </div>
          <div className="calendar-div">
            <Calendar workouts={workouts} />
          </div>
          </div>
          <div className="workout-list">
            <div>
              <h2>Recently added workouts</h2>
            </div>
            <ul className="text-right">
              {workouts?.map((workout) => (
                <div className="singleworkout">
                  <li key={workout?._id}>
                    <a onClick={() => openModal(workout)}>
                      {workout.workoutName}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {selectedWorkout && (
        <WorkoutModal workout={selectedWorkout} onClose={closeModal} />
      )}
      {/* {isStartWorkoutModalOpen && (
        <StartWorkoutModal workout={selectedWorkout} onClose={closeStartWorkoutModal} />
      )} */}
      {isCreateModalOpen && (
        <AddWorkoutModal
          onClose={closeCreateModal}
          onSave={handleCreateWorkout}
          session={useSession}
        />
      )}
    </>
  );
}
