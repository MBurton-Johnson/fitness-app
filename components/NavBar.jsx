"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function NavBar() {
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

    )
}