"use client";

import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";

export default function SignInBtn() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <button className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-xl mb-8" onClick={() => signIn('google')}>
                Sign in with Google
            </button> */}
      <p className="mb-2 text-2xl font-bold mb-4 mt-6">
        Founders: Adriana, Jeeivan, Matt
      </p>
      <div className="mb-4 font-bold mt-6">Our Story</div>
      <div className="max-w-3xl text-center text-justify mb-15">
        Welcome to TracTive, your ultimate fitness companion! Say goodbye to the
        hassle of managing your workouts and nutrition plans. With TracTive, you
        have the power to effortlessly input, organize, and track your fitness
        journey, all in one dynamic platform. From heart-pumping workouts to
        wholesome nutrition, our intuitive interface empowers you to seamlessly
        store and monitor your progress. Whether you're a seasoned gym
        enthusiast or just starting out, TracTive is designed to be your
        steadfast partner in achieving your health and fitness goals. Get ready
        to unlock your full potential, because with TracTive, every rep, every
        meal, and every milestone becomes an exhilarating step towards a
        healthier, happier you!
      </div>
      <GoogleButton
  onClick={() => signIn("google")}
  className="flex items-center gap-4 shadow-xl m-2 mt-32"
/>
    </div>
    
  );
}
