"use client"

import { signIn } from "next-auth/react"

export default function SignInBtn() {
    return (
      <button className="flex items-center gap-4 shadow-xl rounded-lg pl-3" onClick={() => signIn('google')}><span className="bg-blue-500 text-white px-4 py-3">Sign in with Google</span></button>
    )
  }
  