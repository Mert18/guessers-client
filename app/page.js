"use client";
import { getStats } from "@/api/authentication";
import Loader from "@/components/common/Loader";
import Logo from "@/components/common/Logo";
import NavbarNoAuth from "@/components/common/NavbarNoAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    userCount: 0,
    roomCount: 0,
    eventCount: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      getStats().then((response) => {
        setStats(response.data.data);
      });
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
      <div className="flex flex-col text-text justify-center items-center">
        <div className="flex flex-col items-center justify-center py-8 w-1/3">
          <div className="flex flex-col justify-start items-start w-full">
            <h1 className="text-6xl py-4">guessers.io</h1>
            <p>Create a room, invite your friends and start guessing.</p>
          </div>
          <div className="flex justify-start items-center py-4 w-full">
            <p>
              <span className="text-primary font-bold">{stats.userCount}</span>{" "}
              Users, {" "}
            </p>
            <p>
              <span className="text-primary font-bold">{stats.roomCount}</span>{" "}
              Rooms, {" "}
            </p>
            <p>
              <span className="text-primary font-bold">{stats.eventCount}</span>{" "}
              Events
            </p>
          </div>
        </div>
      </div>
    );
  }
}
