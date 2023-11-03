"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function NavBar() {
  const { status, data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          `http://localhost:3006/users/${session?.user?.email}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, session?.user?.email]);
  return (
    <>
      <div className="flex flex-col items-center pt-4 bg-[#2D4545]">
        <h1 className="flex items-center text-4xl font-bold text-white">
          TrackTive
        </h1>
      </div>
      <div className="p-4 flex justify-between items-center bg-[#2D4545] text-white">
        <Link className="font-bold text-lg" href={"/"}>
          Home
        </Link>
        {status === "authenticated" && userData && (
          <Link
            className="font-bold text-lg"
            href={`/workouts/${userData._id}`}
          >
            Workout
          </Link>
        )}
        {status === "authenticated" && userData && (
          <Link
            className="font-bold text-lg"
            href={`/foods/${userData?._id}`}
          >
            Foods
          </Link>
        )}
        {status === "authenticated" && userData && (
          <Link
            className="font-bold text-lg"
            href={`/calendar/${userData?._id}`}
          >
            Weight Tracker
          </Link>
        )}
        {status === "authenticated" ? (
          <button
            className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-500"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
                  ) : (
          <button
            className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-500"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}


