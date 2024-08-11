"use client";
import Loader from "@/components/common/Loader";
import NavbarNoAuth from "@/components/common/NavbarNoAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col text-text">
        <NavbarNoAuth />
        <div className="flex justify-evenly items-center min-h-[50vh]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Guessers</h1>
            <p>
              Create a room, invite your friends and start guessing.
            </p>
          </div>
          <div>
            <p><span className="text-primary text-4xl">352</span> Users</p>
            <p><span className="text-primary text-4xl">123</span> Rooms</p>
            <p><span className="text-primary text-4xl">523</span> Events</p>
          </div>
        </div>
      </div>
    );
  }
}
