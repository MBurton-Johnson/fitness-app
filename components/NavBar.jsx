"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavBar() {

  const { status, data: session } = useSession();
  const [userData, setUserData] = useState(null);

    const {status} = useSession()
    return (
        <div className="p-4 flex justify-between items-center">
            <Link className="font-bold text-lg text-blue-700" href={"/"}>Home</Link>
            <Link className="font-bold text-lg text-blue-700" href={"/workouts/567"}>Workout</Link>
            <Link className="font-bold text-lg text-blue-700" href={"/foods"}>Nutrition</Link>
            {status === "authenticated" ? (
                <button className="bg-slate-900 text-white px-6 py-2 rounded-md" onClick={() => signOut()}>Sign Out</button>
            ) : (
                <button className="bg-slate-900 text-white px-6 py-2 rounded-md" onClick={() => signIn('google')}>Sign In</button>
            )}
        </div>


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
      <div className="flex flex-col items-center mt-8">
        <h1 className="flex items-center text-4xl font-bold text-blue-700">
          TracTive
        </h1>
      </div>
      <div className="p-4 flex justify-between items-center">
        <Link className="font-bold text-lg text-blue-700" href={"/"}>
          Home
        </Link>
        {status === "authenticated" && userData && (
          <Link
            className="font-bold text-lg text-blue-700"
            href={`/workouts/${userData._id}`}
          >
            Workout
          </Link>
        )}
        {status === "authenticated" && userData && (
          <Link
            className="font-bold text-lg text-blue-700"
            href={`/foods/${userData?._id}`}
          >
            Foods
          </Link>
        )}
        {status === "authenticated" ? (
          <button
            className="bg-slate-900 text-white px-6 py-2 rounded-md"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="bg-slate-900 text-white px-6 py-2 rounded-md"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}
