"use client"

import Image from "next/image"
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function UserInfo() {
    const { status, data: session } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`http://localhost:3006/users/${session?.user?.email}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        if (status === "authenticated") {
            fetchUserData();
        }
    }, [status, session?.user?.email]);

    if (status === "authenticated") {
        return (
            <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
              <div className="flex items-center justify-center">
                <Image className="rounded-full" src={session?.user?.image} width={60} height={60} />
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{session?.user?.name}</div>
                <div>Email: <span className="font-bold">{session?.user?.email}</span></div>
                {userData && (
                  <div className="mt-4">
                    <div>Gender: <span className="font-bold">{userData.gender}</span></div>
                    <div>Age: <span className="font-bold">{userData.age}</span></div>
                    <div>Height: <span className="font-bold">{userData.height}cm</span></div>
                    <div>Weight: <span className="font-bold">{userData.weight}KG</span></div>
                    <div className="mt-2">
                      <Link className="font-bold text-lg text-blue-700 block" href={`/profile/create/${userData._id}`}>Create Profile</Link>
                      <Link className="font-bold text-lg text-blue-700 block" href={`/workouts/${userData._id}`}>Workout</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
    } else {
        return <SignInBtn />;
    }
}
