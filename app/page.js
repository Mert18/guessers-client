"use client"
import Midwife from "@/components/public/Midwife";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }else if (session) {
    router.push("/main");
  }

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
