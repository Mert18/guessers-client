"use client"
import Midwife from "@/components/public/Midwife";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="flex justify-center items-center">
        <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
          I was already born
        </button>
      </div>
      <div className="flex justify-center items-center h-full">
        <Midwife />
      </div>
    </div>
  );
}
