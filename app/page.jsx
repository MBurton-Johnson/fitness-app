"use client"

import UserInfo from "@/components/UserInfo"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({ _id: null });

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

        fetchUserData();
}, [session?.user?.email]);


  return (
    <div>
      <UserInfo />
      <div>
        {userData._id}
      </div>
    </div>
    )
  }
  