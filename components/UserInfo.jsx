"use client"

import Image from "next/image"
import SignInBtn from "./SignInBtn";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Link from "next/link";
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';
import { useRouter } from 'next/navigation';


export default function UserInfo() {
    const { status, data: session } = useSession();
    const [userData, setUserData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    const handleOpenDeleteModal = () => {
      setIsDeleteModalOpen(true);
    };
  
    const handleCloseDeleteModal = () => {
      setIsDeleteModalOpen(false);
    };

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


  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3006/users/${userData._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User deleted successfully');
        setUserData(null)
        await signOut()
        router.push('/')
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

    if (status === "authenticated") {
        return (
            <div className="shadow-xl p-8 rounded-md mt-2 flex flex-col gap-3 bg-[#B6D6CC]">
                <div className="flex items-center justify-center">
                    <Image className="rounded-full" src={session?.user?.image} width={60} height={60} />
                </div>
                <div className="text-center">
                    <div className="font-bold text-lg">{session?.user?.name}</div>
                    <div>Email: <span className="font-bold">{session?.user?.email}</span></div>
                    {userData && userData.gender && userData.age && userData.height && userData.weight ? (
                        <div className="mt-4">
                            <div>Gender: <span className="font-bold">{userData.gender}</span></div>
                            <div>Age: <span className="font-bold">{userData.age}</span></div>
                            <div>Height: <span className="font-bold">{userData.height}cm</span></div>
                            <div>Starting Weight: <span className="font-bold">{userData.weight}kg</span></div>
                            <div className="mt-2">
                                <Link className="font-bold text-lg text-blue-700 block" href={`/profile/create/${userData._id}`}>Update Profile</Link>
                            </div>
                            <div className="flex justify-center mt-5">
                            <button onClick={handleOpenDeleteModal} className="font-bold text-lg text-red-700 block">Delete Profile</button>
                            </div>
                            <DeleteConfirmationModal
                                isOpen={isDeleteModalOpen}
                                onClose={handleCloseDeleteModal}
                                onDelete={handleDeleteUser}
                            />
                        </div>
                    ) : (
                        <div className="mt-2">
                            <Link className="font-bold text-lg text-blue-700 block" href={`/profile/create/${userData?._id}`}>Create Profile</Link>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return <SignInBtn />;
    }
}

